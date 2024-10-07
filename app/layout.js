import "./globals.css";
export default function Layout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>CSV Sorting App</title>
      </head>
      <body>{children}</body>
    </html>
  );
}
