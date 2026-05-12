/**
 * @fileoverview this is a test file to show if all the bindings are working correctly, it should be removed in production
 */
import { prisma } from "#/lib/prisma";
import { bucket } from "#/lib/bucket";
import Image from "next/image";
import type { FC } from "react";

// IMPORTANT: this page use server action it's for test we should always use rest api + client side for upload to r2 in production, this is just to show how to use bucket binding in nextjs server action
const uploadFile = async (formData: FormData): Promise<void> => {
	"use server";
	const file = formData.get("file") as File;
	if (!file) {
		console.error("No file selected for upload.");
		return;
	}

	bucket().put(file.name, file).then(() => {
		console.log("File uploaded successfully!");
	}).catch((error) => {
		console.error("Error uploading file:", error);
	});
}

const Page: FC = async () => {
	const count = await prisma.user.count();
	const r2Bucket = await bucket().list();

	const svg = r2Bucket.objects.find((obj) => obj.key.endsWith(".svg"));
	const svgContent = svg && await bucket().get(svg.key).then((res) => res?.text());
	const svgDataUrl = svgContent
	? `data:image/svg+xml;base64,${Buffer.from(svgContent, "utf8").toString("base64")}`
	: null;


	return (
		<div>
			<form action={uploadFile} className="mt-4">
				<input type="file" name="file" />
				<button type="submit" className="mt-2 px-4 py-2 bg-blue-500 text-white rounded">Upload to R2</button>
			</form>
			<h1>App</h1>
			<p>Total Users: {count}</p>
			<pre className="bg-gray-100 p-4 rounded">
				{JSON.stringify(r2Bucket, null, 2)}
			</pre>
			{svgDataUrl && (
				<div className="mt-4">
					<h2>SVG Image from R2:</h2>
					<Image src={svgDataUrl} alt="SVG from R2" width={200} height={200} />
				</div>
			)}
		</div>
	);
}

export default Page;