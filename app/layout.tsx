import "./globals.css";
import ToastProvider from "./provider/toastProvider";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <ToastProvider>{children} </ToastProvider>
      </body>
    </html>
  );
}
