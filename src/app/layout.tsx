import { Manrope, Work_Sans } from "next/font/google";
import "#/styles/globals.css";

const manrope = Manrope({
	subsets: ["latin"],
	variable: "--font-manrope",
	display: "swap",
	weight: ["400", "600", "700"],
});

const worksans = Work_Sans({
	subsets: ["latin"],
	variable: "--font-worksans",
	display: "swap",
	weight: ["400", "600", "700"],
});

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`antialiased ${manrope.variable} ${worksans.variable}`}>{children}</body>
		</html>
	);
}
