import { FC } from "react";
import packageJson from "@/package.json";

const PoweredByFooter: FC = () => {
    return (
        <div>
            <small className="text-center text-neutral-500 block">
                Powered by{" "}
                <a href="https://github.com/onesoft-sudo/sudoc" target="_blank" className="text-blue-500 hover:text-blue-600">
                    Sudoc
                </a>{" "}
                v{packageJson.version}
            </small>
        </div>
    );
};

export default PoweredByFooter;
