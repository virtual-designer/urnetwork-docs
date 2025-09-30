import Link from "@/components/Navigation/Link";
import { BRAND_NAME } from "@/config/config";
import { NAVBAR_PAGES } from "@/config/links";
import styles from "@/styles/Navbar.module.css";
import Image from "next/image";
import logo from "../../images/logo.png";
import Search from "../Searching/Search";
import SearchResultsDesktopWrapper from "../Searching/SearchResultsDesktopWrapper";
import NavbarClientSide from "./NavbarClientSide";
import { NavbarTitle } from "./NavbarTitle";
import SidebarToggleButton from "./SidebarToggleButton";

export default function Navbar() {
	return (
		<>
			<nav className={styles.nav}>
				<div className="flex items-center gap-3">
					<SidebarToggleButton />

					<a className={styles.logoWrapper} href="/">
						<Image
							src={logo.src}
							alt="Logo"
							height={128}
							width={128}
						/>
						<span className="mobile">{BRAND_NAME}</span>
						<NavbarTitle />
					</a>
				</div>

				<ul className={`${styles.ul} desktop`}>
					{NAVBAR_PAGES.map(link => {
						const LinkComponent = link.url.startsWith("/")
							? Link
							: "a";
						return (
							<li key={`${link.url}_${link.name}`}>
								<LinkComponent
									href={link.url}
									{...(/^http(s?):\/\//gi.test(link.url)
										? {
												target: "_blank",
												rel: "noreferrer",
										  }
										: {})}
									title={link.name}
								>
									{link.name}
								</LinkComponent>
							</li>
						);
					})}
				</ul>

				<Search />
				<NavbarClientSide />
			</nav>

			<div className={styles.navGrid}>
				<div></div>
				<div></div>
				<div className="relative justify-self-end">
					<SearchResultsDesktopWrapper />
				</div>
			</div>
		</>
	);
}
