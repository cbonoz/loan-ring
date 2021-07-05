import faker from "faker";
faker.seed(124);

export const capitalize = s => {
  if (typeof s !== "string") return "";
  const res = s.charAt(0).toUpperCase() + s.slice(1);
  return res.replaceAll("_", " ");
};

export const hex = string => "0x" + Buffer.from(string).toString("hex");

export const displayValue = (k, v) => {
  if (Array.isArray(v)) {
    return v.map(x => displayValue(k, x)).join(", ");
  } else if (typeof v === "object" && v.title) {
    return v.title;
  }

  return v;
};

// const initCards = () => {
//   const cards = [];
//   for (let i = 0; i < 7; i++) {
//     const createdAt = faker.date.recent();
//     const name = faker.company.companyName();
//     const description = faker.company.catchPhrase();
//     const img = `${faker.image.sports()}?random=${Math.round(Math.random() * 1000)}`;
//     const card = {
//       createdAt,
//       title: name,
//       description,
//       img,
//     };
//     cards.push(card);
//   }
//   console.log(cards);
//   return cards;
// };

export const EXAMPLE_CARDS = [
  {
    id: "500",
    title: "Purely Peru",
    description:
      "Clean and readily available water is something we take for granted, but there are places around the world that aren't so fortunate. Safe Water is an initiative that empowers communities like Piura, Peru.",
    duration: "149",
    thumbURL: "https://res.cloudinary.com/dhl3gjazr/image/upload/v1540096462/pay-it-forward/Play_It_Forward3.png",
    imgURL: "https://res.cloudinary.com/dhl3gjazr/image/upload/v1540096462/pay-it-forward/Play_It_Forward3.png",
    bgURL: "https://res.cloudinary.com/dhl3gjazr/image/upload/v1540096462/pay-it-forward/Play_It_Forward3.png",
    videoURL: "https://res.cloudinary.com/dhl3gjazr/video/upload/v1540096396/pay-it-forward/Purely_Peru.mp4",
    categories: ["Recommended For You"],
    channel_id: "13454",
    tags: ["Donate"],
  },
  {
    id: "501",
    title: "Build it for Babies",
    description: "The Road is No Place to Give Birth",
    duration: "96",
    thumbURL: "https://res.cloudinary.com/dhl3gjazr/image/upload/v1540081948/pay-it-forward/Build_it_for_Babies.png",
    imgURL: "https://res.cloudinary.com/dhl3gjazr/image/upload/v1540081948/pay-it-forward/Build_it_for_Babies.png",
    bgURL: "https://res.cloudinary.com/dhl3gjazr/image/upload/v1540081948/pay-it-forward/Build_it_for_Babies.png",
    videoURL:
      "https://res.cloudinary.com/dhl3gjazr/video/upload/v1540078501/pay-it-forward/Build_it_for_Babies_3A_The_Road_is_No_Place_to_Give_Birth.mp4",
    categories: ["Recommended For You"],
    channel_id: "13454",
    tags: ["Donate"],
  },
  {
    id: "502",
    title: "The Spring",
    description: "Water Story",
    duration: "1203",
    thumbURL: "https://res.cloudinary.com/dhl3gjazr/image/upload/v1540087534/pay-it-forward/Water_Story.png",
    imgURL: "https://res.cloudinary.com/dhl3gjazr/image/upload/v1540087534/pay-it-forward/Water_Story.png",
    bgURL: "https://res.cloudinary.com/dhl3gjazr/image/upload/v1540087534/pay-it-forward/Water_Story.png",
    videoURL:
      "https://res.cloudinary.com/dhl3gjazr/video/upload/v1540087798/pay-it-forward/The_Spring_-_The_charity_3A_water_story.mp4",
    categories: ["Recommended For You"],
    channel_id: "13454",
    tags: ["Donate"],
  },
  {
    id: "503",
    title: "Internet Archive",
    description:
      "The Internet Archive acts as a digital library archiving websites and provides free access to the public.",
    duration: "243",
    thumbURL: "https://res.cloudinary.com/dhl3gjazr/image/upload/v1558754394/block-charity/blockcharity-small-7.png",
    imgURL: "https://res.cloudinary.com/dhl3gjazr/image/upload/v1558754388/block-charity/blockcharity-large-7.png",
    bgURL: "https://res.cloudinary.com/dhl3gjazr/image/upload/v1558754388/block-charity/blockcharity-large-7.png",
    videoURL: "https://res.cloudinary.com/dhl3gjazr/video/upload/v1571983049/block-charity/internetarchives.mp4",
    categories: ["Recommended For You"],
    channel_id: "13454",
    tags: ["Donate"],
  },
  {
    id: "504",
    title: "The Water Project",
    description:
      "The Water Project is unlocking human potential by providing sustainable water projects to communities in sub-Saharan Africa who suffer needlessly from a lack of access to clean water and proper sanitation. Access to water unlocks potential. It removes obstacles that hinder a community from growing itself out of poverty.",
    duration: "99",
    thumbURL: "https://res.cloudinary.com/dhl3gjazr/image/upload/v1558754388/block-charity/blockcharity-small-1.png",
    imgURL: "https://res.cloudinary.com/dhl3gjazr/image/upload/v1558754402/block-charity/blockcharity-large-1.png",
    bgURL: "https://res.cloudinary.com/dhl3gjazr/image/upload/v1558754402/block-charity/blockcharity-large-1.png",
    videoURL: "https://res.cloudinary.com/dhl3gjazr/video/upload/v1558502330/block-charity/water-project.mp4",
    categories: ["Recommended For You"],
    channel_id: "13454",
    tags: ["Donate"],
  },
  {
    id: "505",
    title: "Omni Nano",
    description:
      "Omni Nano is a 501(c)(3) public benefit organization devoted to nanotechnology education. Our curriculum is designed for high school and college students and focuses on the practical applications of nanotechnology to promote professional development and STEM career opportunities.",
    duration: "93",
    thumbURL: "https://res.cloudinary.com/dhl3gjazr/image/upload/v1558754389/block-charity/blockcharity-small-2.png",
    imgURL: "https://res.cloudinary.com/dhl3gjazr/image/upload/v1558754400/block-charity/blockcharity-large-2.png",
    bgURL: "https://res.cloudinary.com/dhl3gjazr/image/upload/v1558754400/block-charity/blockcharity-large-2.png",
    videoURL: "https://res.cloudinary.com/dhl3gjazr/video/upload/v1571982074/block-charity/bfb.mp4",
    categories: ["Recommended For You"],
    channel_id: "13454",
    tags: ["Donate"],
  },
  {
    id: "506",
    title: "Watsi",
    description:
      "Watsi is a global crowdfunding platform for healthcare that enables anyone to donate as little as $5 to directly fund life-changing medical care for people in need. 100% of every donation funds medical care and we are dedicated to complete transparency.",
    duration: "78",
    thumbURL: "https://res.cloudinary.com/dhl3gjazr/image/upload/v1558754390/block-charity/blockcharity-small-3.png",
    imgURL: "https://res.cloudinary.com/dhl3gjazr/image/upload/v1558754398/block-charity/blockcharity-large-3.png",
    bgURL: "https://res.cloudinary.com/dhl3gjazr/image/upload/v1558754398/block-charity/blockcharity-large-3.png",
    videoURL: "https://res.cloudinary.com/dhl3gjazr/video/upload/v1571982357/block-charity/watsi.mp4",
    categories: ["Recommended For You"],
    channel_id: "13454",
    tags: ["Donate"],
  },
  {
    id: "507",
    title: "Antiwar",
    description:
      "Antiwar is the top source for antiwar news and analysis in all the U.S. Empire. Since 1995 Antiwar.com has been the go-to site for news of the War Party’s latest schemes and machinations. We’ve exposed their lies time and again mobilizing our readers worldwide to stand up for peace.",
    duration: "46",
    thumbURL: "https://res.cloudinary.com/dhl3gjazr/image/upload/v1558754392/block-charity/blockcharity-small-4.png",
    imgURL: "https://res.cloudinary.com/dhl3gjazr/image/upload/v1558754384/block-charity/blockcharity-large-4.png",
    bgURL: "https://res.cloudinary.com/dhl3gjazr/image/upload/v1558754384/block-charity/blockcharity-large-4.png",
    videoURL: "https://res.cloudinary.com/dhl3gjazr/video/upload/v1571982653/block-charity/antiwar.mp4",
    categories: ["Recommended For You"],
    channel_id: "13454",
    tags: ["Donate"],
  },
  {
    id: "508",
    title: "Tunapanda",
    description:
      "Tunapanda Institute does digital era vocational skill training in low-income parts of East Africa. The organization focuses on skills like web design computer programming and video editing that can help people earn an income improve their communities and engage in meaningful self-expression. They deploy computer networks using open source software and free (libre) educational video content.",
    duration: "123",
    thumbURL: "https://res.cloudinary.com/dhl3gjazr/image/upload/v1558754391/block-charity/blockcharity-small-5.png",
    imgURL: "https://res.cloudinary.com/dhl3gjazr/image/upload/v1558754407/block-charity/blockcharity-large-5.png",
    bgURL: "https://res.cloudinary.com/dhl3gjazr/image/upload/v1558754407/block-charity/blockcharity-large-5.png",
    videoURL: "https://res.cloudinary.com/dhl3gjazr/video/upload/v1571983359/block-charity/tunapanda.mp4",
    categories: ["Recommended For You"],
    channel_id: "13454",
    tags: ["Donate"],
  },
  {
    id: "508",
    title: "Chicago Wish Foundation",
    description:
      "A Special Wish Chicago is the wish-granting foundation in the Chicagoland area dedicated to enlivening families with hope and joy by granting the wishes of local children and young adults – from birth through age 20 – who have been diagnosed with life-threatening conditions. The Chicago chapter is wholeheartedly committed to creating special memories through connecting children with the loving hearts and donations of individuals and corporate sponsors in the Chicagoland community.",
    duration: "195",
    thumbURL: "https://res.cloudinary.com/dhl3gjazr/image/upload/v1558754392/block-charity/blockcharity-small-6.png",
    imgURL: "https://res.cloudinary.com/dhl3gjazr/image/upload/v1558754373/block-charity/blockcharity-large-6.png",
    bgURL: "https://res.cloudinary.com/dhl3gjazr/image/upload/v1558754373/block-charity/blockcharity-large-6.png",
    videoURL: "https://res.cloudinary.com/dhl3gjazr/video/upload/v1571983573/block-charity/chicagowish.mp4",
    categories: ["Recommended For You"],
    channel_id: "13454",
    tags: ["Donate"],
  },
];
