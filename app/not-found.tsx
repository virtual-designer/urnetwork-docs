import { Button } from "@mui/material";
import { headers } from "next/headers";
import { MdError } from "react-icons/md";

export const metadata = {
    title: "404 Not Found",
    description: "This page doesn't exist!",
};

export default async function NotFound() {
    return (
        <main className="text-center p-5 lg:w-3/6 block mx-auto my-3">
            <h1 className="text-2xl md:text-3xl lg:text-4xl text-red-500/90 flex justify-center items-center gap-3 mt-5 lg:mt-10">
                <MdError className="scale-[1.1]" />
                <span>404 Not Found</span>
            </h1>
            <h3 className="text-xl lg:text-2xl py-3">Page not found</h3>

            <p className="text-[#aaa] mt-5">
                The requested URL{" "}
                <span className="font-mono text-white font-bold">
                    {(await headers()).get("x-invoke-url")}
                </span>{" "}
                was not found on this server.<br />Are you sure the URL you&lsquo;ve
                tried to access is right?
            </p>
            <p className="text-[#aaa] mb-5">
                If you think this should not happen, then please contact the
                webmaster of this site.
            </p>
            <br />
            <Button href="/">Go back to home page</Button>
        </main>
    );
}
