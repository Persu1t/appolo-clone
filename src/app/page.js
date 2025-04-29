
import Destination from "@/components/destination";
export const metadata = {
  title: "Top General Physicians & Internal Medicine Doctors | Apollo Clone",
  description:
    "Find and book appointments with highly rated general physicians and internal medicine specialists. Check availability, ratings, and fees online.",
  keywords: [
    "general physician",
    "internal medicine doctor",
    "online doctor consultation",
    "book doctor online",
    "Apollo doctors",
    "doctor listing",
    "healthcare platform",
  ],
  openGraph: {
    title: "Top General Physicians – Apollo Clone",
    description:
      "Browse and book India's best general physicians and internal medicine experts online.",
    url: "https://appolo-clone.vercel.app/", // replace with your deployed URL
    siteName: "Apollo Clone",
    images: [
      {
        url: "https://your-app-url.com/images/seo-banner.jpg", 
        width: 1200,
        height: 630,
        alt: "Apollo General Physician Listing",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Book General Physicians Online – Apollo Clone",
    description:
      "Find and consult top-rated general physicians and internal medicine specialists.",
    images: ["https://your-app-url.com/images/seo-banner.jpg"],
  },
};

export default function Home() {
  return(
    <>
      <Destination/>
    </>
  )
}
