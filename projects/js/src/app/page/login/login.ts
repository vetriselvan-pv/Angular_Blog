import { ChangeDetectionStrategy, Component, ElementRef, ViewChild, signal } from '@angular/core';

interface GoogleCredentialResponse {
  credential: string;
}

interface GoogleUserProfile {
  email?: string;
  name?: string;
  picture?: string;
}

interface GoogleAccountsId {
  initialize: (config: {
    client_id: string;
    callback: (response: GoogleCredentialResponse) => void;
    auto_select?: boolean;
    cancel_on_tap_outside?: boolean;
  }) => void;
  renderButton: (
    parent: HTMLElement,
    options: {
      type?: 'standard' | 'icon';
      theme?: 'outline' | 'filled_blue' | 'filled_black';
      size?: 'large' | 'medium' | 'small';
      text?: 'signin_with' | 'signup_with' | 'continue_with' | 'signin';
      shape?: 'rectangular' | 'pill' | 'circle' | 'square';
      width?: number;
    }
  ) => void;
}

declare global {
  interface Window {
    __GOOGLE_CLIENT_ID__?: string;
    google?: {
      accounts: {
        id: GoogleAccountsId;
      };
    };
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrl: './login.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {
  @ViewChild('googleButtonContainer', { static: true })
  private readonly googleButtonContainer?: ElementRef<HTMLDivElement>;

  protected readonly loading = signal(true);
  protected readonly error = signal<string | null>(null);
  protected readonly user = signal<GoogleUserProfile | null>(null);

  protected async ngOnInit(): Promise<void> {
    const clientId = window.__GOOGLE_CLIENT_ID__;

    if (!clientId) {
      this.error.set(
        'Google client id is missing. Set window.__GOOGLE_CLIENT_ID__ before loading the app.'
      );
      this.loading.set(false);
      return;
    }

    try {
      await this.loadGoogleScript();
      this.initializeGoogleLogin(clientId);
    } catch {
      this.error.set('Unable to load Google login script.');
    } finally {
      this.loading.set(false);
    }
  }

  private loadGoogleScript(): Promise<void> {
    if (window.google?.accounts?.id) {
      return Promise.resolve();
    }

    return new Promise((resolve, reject) => {
      const existingScript = document.querySelector(
        'script[src="https://accounts.google.com/gsi/client"]'
      );

      if (existingScript) {
        existingScript.addEventListener('load', () => resolve(), { once: true });
        existingScript.addEventListener('error', () => reject(), { once: true });
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      script.onload = () => resolve();
      script.onerror = () => reject();
      document.head.appendChild(script);
    });
  }

  private initializeGoogleLogin(clientId: string): void {
    const buttonContainer = this.googleButtonContainer?.nativeElement;

    if (!buttonContainer || !window.google?.accounts?.id) {
      this.error.set('Google login could not be initialized.');
      return;
    }

    window.google.accounts.id.initialize({
      client_id: clientId,
      callback: (response) => this.handleGoogleCredential(response),
      auto_select: false,
      cancel_on_tap_outside: true
    });

    buttonContainer.innerHTML = '';
    window.google.accounts.id.renderButton(buttonContainer, {
      type: 'standard',
      theme: 'outline',
      size: 'large',
      text: 'signin_with',
      shape: 'rectangular',
      width: 320
    });
  }

  private handleGoogleCredential(response: GoogleCredentialResponse): void {
    const payload = this.parseJwtPayload(response.credential);

    if (!payload) {
      this.error.set('Unable to read Google profile from token.');
      return;
    }

    this.user.set({
      email: typeof payload['email'] === 'string' ? payload['email'] : undefined,
      name: typeof payload['name'] === 'string' ? payload['name'] : undefined,
      picture: typeof payload['picture'] === 'string' ? payload['picture'] : undefined
    });
    this.error.set(null);
  }

  private parseJwtPayload(token: string): Record<string, unknown> | null {
    const segments = token.split('.');
    if (segments.length < 2) {
      return null;
    }

    try {
      const payload = segments[1].replace(/-/g, '+').replace(/_/g, '/');
      const decodedPayload = atob(payload);
      const parsed = JSON.parse(decodedPayload) as unknown;
      return typeof parsed === 'object' && parsed !== null ? (parsed as Record<string, unknown>) : null;
    } catch {
      return null;
    }
  }
}
