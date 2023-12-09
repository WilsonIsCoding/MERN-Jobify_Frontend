import "./globals.css";
import StyledComponentsRegistry from "./lib/registry";
import ToastProvider from "./provider/toastProvider";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <StyledComponentsRegistry>
          <ToastProvider>{children} </ToastProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
