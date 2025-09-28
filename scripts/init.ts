#!/usr/bin/env node

import path from "path";
import * as config from "../config/config.ts";
import { copyFileSync } from "fs";

console.log("Copying logo image...");

copyFileSync(
    path.resolve(
        import.meta.dirname,
        "../images",
        config.BRAND_LOGO_IMAGE_FILE_NAME,
    ),
    path.resolve(import.meta.dirname, "../app/icon.png"),
);

