import { Link } from '@zeswen/ui';
import NextLink from 'next/link';
import { locales } from '../i18n';
import './globals.css';

type RootLayoutProps = {
  children: React.ReactNode;
};

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html lang="en">
      <body>
        {locales!.map((locale) => (
          <NextLink
            legacyBehavior
            passHref
            key={locale}
            href="/"
            locale={locale}
          >
            <Link className="mx-2">{locale}</Link>
          </NextLink>
        ))}
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
