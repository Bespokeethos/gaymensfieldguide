import google.auth
from googleapiclient.discovery import build

SITE_URL = "https://gaymensfieldguide.com/"
SITEMAP_URL = "https://gaymensfieldguide.com/sitemap.xml"

def submit_sitemap():
    try:
        creds, project = google.auth.default(
            scopes=['https://www.googleapis.com/auth/webmasters']
        )
        service = build('searchconsole', 'v1', credentials=creds)
        
        # Submit sitemap
        print(f"Submitting sitemap: {SITEMAP_URL}")
        service.sitemaps().submit(siteUrl=SITE_URL, feedpath=SITEMAP_URL).execute()
        print("✅ Sitemap submitted!")
        
        # List sitemaps to confirm
        sitemaps = service.sitemaps().list(siteUrl=SITE_URL).execute()
        print("\nSitemaps registered:")
        for sm in sitemaps.get('sitemap', []):
            print(f"  - {sm['path']} (Last submitted: {sm.get('lastSubmitted', 'N/A')})")
            
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    submit_sitemap()
