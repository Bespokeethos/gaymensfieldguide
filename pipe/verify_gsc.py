import google.auth
from googleapiclient.discovery import build

SITE_URL = "https://gaymensfieldguide.com/"

def verify_site():
    try:
        creds, project = google.auth.default(
            scopes=['https://www.googleapis.com/auth/siteverification']
        )
        service = build('siteVerification', 'v1', credentials=creds)
        
        # Step 1: Get verification token
        print("Requesting META tag token...")
        token_response = service.webResource().getToken(
            body={
                "verificationMethod": "META",
                "site": {
                    "identifier": SITE_URL,
                    "type": "SITE"
                }
            }
        ).execute()
        
        token = token_response.get('token')
        print(f"TOKEN: {token}")
        
        # Step 2: Attempt to verify (assumes token is already on site)
        print("\nAttempting verification...")
        verify_response = service.webResource().insert(
            verificationMethod="META",
            body={
                "site": {
                    "identifier": SITE_URL,
                    "type": "SITE"
                }
            }
        ).execute()
        
        print(f"VERIFIED: {verify_response}")
        return token
        
    except Exception as e:
        print(f"Error: {e}")
        # Extract token from error if present
        if 'token' in str(e):
            print("Token may be in error message above")
        return None

if __name__ == "__main__":
    verify_site()
