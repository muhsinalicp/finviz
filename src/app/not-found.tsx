import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex items-center h-full  justify-center">
      <div>
        <h2 className="font-bold text-3xl text-center">Page Not Found</h2>
        <p>Could not find requested resource</p>
        <p className="text-center">
          {" "}
          <Link className="text-sky-600 " href="/">
            Return Home
          </Link>
        </p>
      </div>
    </div>
  );
}
