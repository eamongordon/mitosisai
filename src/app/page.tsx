'use client';

import ImageUploader from "@/components/ImageUploader";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <iframe src="/backup-interface.html" frameBorder="0" width="100%" height="500px" allowFullScreen></iframe>
      {/*<ImageUploader />*/}
    </main>
  )
}
