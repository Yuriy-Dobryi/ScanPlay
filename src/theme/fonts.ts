import FontResources from '~/assets/fonts';

export type FontAlias = keyof typeof FontResources;

const Fonts = (Object.keys(FontResources) as FontAlias[]).reduce(
  (acc, key) => {
    acc[key] = key;
    return acc;
  },
  {} as Record<FontAlias, FontAlias>,
);

export default Fonts;
