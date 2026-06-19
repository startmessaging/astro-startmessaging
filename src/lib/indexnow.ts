/**
 * IndexNow URL submission utility
 * Submits URLs to search engines for instant indexing
 * Docs: https://www.indexnow.org/documentation
 */

const INDEXNOW_KEY = '973435a552dbf3f46866d05fa2438b08';
const INDEXNOW_ENDPOINT = 'https://api.indexnow.org/indexnow';
const INDEXNOW_HOST = 'startmessaging.com';
// Key must be at site root (IndexNow Option 1). A key under /indexnow/ only
// validates URLs under that path — not the whole site.
const KEY_LOCATION = `https://${INDEXNOW_HOST}/${INDEXNOW_KEY}.txt`;

export interface IndexNowSubmission {
  host: string;
  key: string;
  keyLocation: string;
  urlList: string[];
}

/**
 * Submit URLs to IndexNow for instant indexing
 * @param urls - Array of full URLs to submit (max 10,000)
 */
export async function submitToIndexNow(urls: string[]): Promise<{
  success: boolean;
  status?: number;
  message: string;
}> {
  if (!urls?.length) {
    return { success: false, message: 'No URLs provided' };
  }

  if (urls.length > 10000) {
    return { success: false, message: 'Maximum 10,000 URLs per request' };
  }

  const payload: IndexNowSubmission = {
    host: INDEXNOW_HOST,
    key: INDEXNOW_KEY,
    keyLocation: KEY_LOCATION,
    urlList: urls,
  };

  try {
    const response = await fetch(INDEXNOW_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify(payload),
    });

    if (response.ok || response.status === 202) {
      return {
        success: true,
        status: response.status,
        message:
          response.status === 202
            ? 'URLs submitted, pending verification'
            : `Successfully submitted ${urls.length} URL(s)`,
      };
    }

    const errorText = await response.text().catch(() => 'Unknown error');
    return {
      success: false,
      status: response.status,
      message: `IndexNow API error: ${response.status} - ${errorText}`,
    };
  } catch (error) {
    return {
      success: false,
      message: `Network error: ${error instanceof Error ? error.message : 'Unknown'}`,
    };
  }
}

/** Submit a single URL to IndexNow */
export async function submitSingleUrl(url: string) {
  return submitToIndexNow([url]);
}

/**
 * Submit all URLs from sitemap to IndexNow.
 * Splits into 10k chunks — IndexNow API limit, not diagnostic batching.
 */
export async function submitSitemap(
  sitemapUrl = `https://${INDEXNOW_HOST}/sitemap-index.xml`,
) {
  try {
    const response = await fetch(sitemapUrl);
    const xml = await response.text();

    const urlMatches = xml.matchAll(/<loc>(https?:\/\/[^<]+)<\/loc>/g);
    const urls = Array.from(urlMatches, (match) => match[1]);

    if (!urls.length) {
      return { success: false, message: 'No URLs found in sitemap' };
    }

    if (urls.length <= 10000) {
      return submitToIndexNow(urls);
    }

    const results = [];
    for (let i = 0; i < urls.length; i += 10000) {
      const batch = urls.slice(i, i + 10000);
      const result = await submitToIndexNow(batch);
      results.push(result);

      if (i + 10000 < urls.length) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    }

    const successCount = results.filter((r) => r.success).length;
    return {
      success: successCount > 0,
      message: `Submitted ${successCount}/${results.length} batches successfully`,
      batches: results,
    };
  } catch (error) {
    return {
      success: false,
      message: `Sitemap fetch error: ${error instanceof Error ? error.message : 'Unknown'}`,
    };
  }
}
