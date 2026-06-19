/**
 * IndexNow URL submission utility
 * Submits URLs to search engines for instant indexing
 * Docs: https://www.indexnow.org/documentation
 */

const INDEXNOW_KEY = '973435a552dbf3f46866d05fa2438b08';
const INDEXNOW_ENDPOINT = 'https://api.indexnow.org/indexnow';
const KEY_LOCATION = 'https://startmessaging.com/indexnow/973435a552dbf3f46866d05fa2438b08.txt';

export interface IndexNowSubmission {
  host: string;
  key: string;
  keyLocation: string;
  urlList: string[];
}

/**
 * Submit URLs to IndexNow for instant indexing
 * @param urls - Array of full URLs to submit (max 10,000)
 * @returns Promise with response status
 */
export async function submitToIndexNow(urls: string[]): Promise<{
  success: boolean;
  status?: number;
  message: string;
}> {
  if (!urls || urls.length === 0) {
    return { success: false, message: 'No URLs provided' };
  }

  // IndexNow supports up to 10,000 URLs per request
  if (urls.length > 10000) {
    return { success: false, message: 'Maximum 10,000 URLs per request' };
  }

  const payload: IndexNowSubmission = {
    host: 'startmessaging.com',
    key: INDEXNOW_KEY,
    keyLocation: KEY_LOCATION,
    urlList: urls,
  };

  try {
    const response = await fetch(INDEXNOW_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(payload),
    });

    // 200 = Success, 202 = Accepted (pending verification)
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

    // Handle errors
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

/**
 * Submit a single URL to IndexNow
 * @param url - Full URL to submit
 */
export async function submitSingleUrl(url: string) {
  return submitToIndexNow([url]);
}

/**
 * Submit all URLs from sitemap to IndexNow
 * Useful for initial bulk submission or after major updates
 * @param sitemapUrl - URL to your sitemap.xml
 */
export async function submitSitemap(sitemapUrl: string = 'https://startmessaging.com/sitemap-index.xml') {
  try {
    const response = await fetch(sitemapUrl);
    const xml = await response.text();
    
    // Extract URLs from sitemap (simplified regex, works for most sitemaps)
    const urlMatches = xml.matchAll(/<loc>(https?:\/\/[^<]+)<\/loc>/g);
    const urls = Array.from(urlMatches).map((match) => match[1]);

    if (urls.length === 0) {
      return { success: false, message: 'No URLs found in sitemap' };
    }

    // Submit in batches if more than 10,000
    if (urls.length <= 10000) {
      return submitToIndexNow(urls);
    }

    // Split into batches of 10,000
    const results = [];
    for (let i = 0; i < urls.length; i += 10000) {
      const batch = urls.slice(i, i + 10000);
      const result = await submitToIndexNow(batch);
      results.push(result);
      
      // Small delay between batches to avoid rate limiting
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
