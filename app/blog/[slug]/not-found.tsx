import Link from "next/link";

export default function ArticleNotFound() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-24 text-center">
      <h1 className="font-display text-3xl font-bold">Artikel Tidak Ditemukan</h1>
      <p className="mt-4 text-ivory-dim">
        Artikel yang Anda cari mungkin sudah dipindahkan atau belum tersedia.
      </p>
      <Link
        href="/blog"
        className="mt-8 inline-flex rounded-full bg-blue-500 hover:bg-blue-400 transition-colors px-6 py-3 font-semibold"
      >
        Kembali ke Blog
      </Link>
    </div>
  );
}
