"use client";

import { useNavVariant } from "./NavProvider";
import PillNav from "./PillNav";
import OverlayNav from "./OverlayNav";
import AutoHideNav from "./AutoHideNav";
import NavSwitcher from "./NavSwitcher";

/**
 * Renders the active nav variant + the temporary switcher.
 * When you commit to one variant, replace the switch with that component
 * and remove NavSwitcher + the unused nav files.
 */
export default function SiteNav() {
  const { variant } = useNavVariant();
  return (
    <>
      {variant === "pill" && <PillNav />}
      {variant === "overlay" && <OverlayNav />}
      {variant === "autohide" && <AutoHideNav />}
      <NavSwitcher />
    </>
  );
}
