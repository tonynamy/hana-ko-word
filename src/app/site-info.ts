import { usePathname } from "next/navigation";

type IndexSite = {
  title: string;
};

type SiteMap = IndexSite & {
  sites?: {
    [k: string]: SiteMap;
  };
};

const rootSitemap: SiteMap = {
  title: "Hana Ko World",
  sites: {
    study: {
      title: "Study!",
    },
    test: {
      title: "Test!",
    },
    list: {
      title: "List",
    },
  },
};

const findSiteFromSitemap = (
  sitemap: SiteMap,
  pathArray: string[]
): SiteMap => {
  pathArray.shift();

  if (pathArray.length == 0) {
    return sitemap;
  }

  const subPath = pathArray[0];
  const subSites = sitemap.sites;

  if (!subSites) throw Error("Invalid Site");

  const subSitemap = subSites[subPath as keyof typeof subSites];

  pathArray.shift();

  return findSiteFromSitemap(subSitemap, pathArray);
};

export const useCurrentSiteInfo = () => {
  const pathname = usePathname();
  const pathArray = [
    ...["/"],
    ...pathname.split("/").filter((part) => part !== ""),
  ];

  const sitemap = findSiteFromSitemap(rootSitemap, [...pathArray]);
  pathArray.pop();

  return {
    sitemap,
    parent: pathArray.length ? pathArray.join("/") : undefined,
  };
};
