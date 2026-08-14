export interface Track {
  id: number;
  title: string;
  artist: string;
  cover: string;
  audioUrl: string;
  duration: number; // seconds
}

export const tracks: Track[] = [
  {
    id: 1,
    title: "Aankhon Mein Teri (Ajab Si)",
    artist: "KK",
    cover: "https://c.saavncdn.com/179/Om-Shanti-Om-Hindi-2007-20241205141724-500x500.jpg",
    audioUrl: "https://aac.saavncdn.com/179/d5930b9680ea3b17376351dd34c45892_320.mp4",
    duration: 241
  },
  {
    id: 2,
    title: "Pal Pal Dil Ke Paas",
    artist: "Kishore Kumar",
    cover: "https://c.saavncdn.com/821/Blackmail-Hindi-1973-20190924060932-500x500.jpg",
    audioUrl: "https://aac.saavncdn.com/821/fc6676156d0bab59229fc17f48ad2956_320.mp4",
    duration: 327
  },
  {
    id: 3,
    title: "Yeh Jo Halka Halka Suroor Hai",
    artist: "Nusrat Fateh Ali Khan",
    cover: "https://c.saavncdn.com/554/Yeh-Jo-Halka-Halka-Suroor-Hai-Urdu-2025-20251112173742-500x500.jpg",
    audioUrl: "https://aac.saavncdn.com/554/8ca5b88fd012947d672523a87761aa0d_320.mp4",
    duration: 1782
  },
  {
    id: 4,
    title: "Gulabi Aankhen",
    artist: "Mohammed Rafi",
    cover: "https://c.saavncdn.com/623/The-Train-Hindi-2008-20240902131104-500x500.jpg",
    audioUrl: "https://aac.saavncdn.com/623/30316c7de02d9b5ba24a682c13d6ec2f_320.mp4",
    duration: 198
  },
  {
    id: 5,
    title: "Aaj Jaane Ki Zid Na Karo",
    artist: "Farida Khanum",
    cover: "https://c.saavncdn.com/728/Malika-E-Ghazal-Farida-Khanum-Hindi-2003-20250823173819-500x500.jpg",
    audioUrl: "https://aac.saavncdn.com/728/6cc6a5991da6f9f89c12d9f9bd387698_320.mp4",
    duration: 431
  },
  {
    id: 6,
    title: "Tera Hone Laga Hoon",
    artist: "Atif Aslam, Alisha Chinai",
    cover: "https://c.saavncdn.com/792/Ajab-Prem-Ki-Ghazab-Kahani-Hindi-2009-20260123163407-500x500.jpg",
    audioUrl: "https://aac.saavncdn.com/647/b3541d65fed57f2811006928bdef42e9_320.mp4",
    duration: 300
  },
  {
    id: 7,
    title: "Chaudhvin Ka Chand Ho",
    artist: "Mohammed Rafi",
    cover: "https://c.saavncdn.com/899/Chaudhvin-Ka-Chand-Hindi-1960-20230509153502-500x500.jpg",
    audioUrl: "https://aac.saavncdn.com/899/a72c06c2de78c8e8d6077cef6c6c5073_sar_320.mp4",
    duration: 224
  },
  {
    id: 8,
    title: "Maula Mere Maula",
    artist: "Roop Kumar Rathod",
    cover: "https://c.saavncdn.com/524/Anwar-Hindi-2007-20180112-500x500.jpg",
    audioUrl: "https://aac.saavncdn.com/524/67a2ec08ed5b373ab38e6c9b462f2d73_sar_320.mp4",
    duration: 364
  },
  {
    id: 9,
    title: "Yeh Shaam Mastani",
    artist: "Kishore Kumar",
    cover: "https://c.saavncdn.com/398/Gems-Of-Kishore-Kumar-Hindi-1994-20260209103233-500x500.jpg",
    audioUrl: "https://aac.saavncdn.com/398/9dc23f6c7bd24542d991b550e933332a_320.mp4",
    duration: 220
  },
  {
    id: 10,
    title: "Mere Rashke Qamar",
    artist: "Nusrat Fateh Ali Khan",
    cover: "https://c.saavncdn.com/875/World-Sufi-Spirit-Festival-Kavita-Seth-Hindi-2015-500x500.jpg",
    audioUrl: "https://aac.saavncdn.com/875/9a144c662fdd837516c9c35b3366616e_320.mp4",
    duration: 340
  },
  {
    id: 11,
    title: "Tum Se Hi",
    artist: "Mohit Chauhan",
    cover: "https://c.saavncdn.com/223/Jab-We-Met-Hindi-2007-20231016162009-500x500.jpg",
    audioUrl: "https://aac.saavncdn.com/223/7eddc0f9b56f110ae39a145752fabb34_320.mp4",
    duration: 321
  },
  {
    id: 12,
    title: "Kya Khoob Lagti Ho",
    artist: "Mukesh & Kanchan",
    cover: "https://c.saavncdn.com/926/Dharmatma-Hindi-1975-20190306-500x500.jpg",
    audioUrl: "https://aac.saavncdn.com/926/56a2eb4faf49070ce7ac4ffa2881d051_sar_320.mp4",
    duration: 239
  },
  {
    id: 13,
    title: "Tum Ko (From \"Rockstar\")",
    artist: "Kavita Krishnamurthy, A.R. Rahman",
    cover: "https://c.saavncdn.com/408/Rockstar-Hindi-2011-20221212023139-500x500.jpg",
    audioUrl: "https://aac.saavncdn.com/274/9f5da8ef201070f3d789f1f63ed94bb6_320.mp4",
    duration: 348
  },
  {
    id: 14,
    title: "Hothon Se Chhu Lo Tum",
    artist: "Jagjit Singh",
    cover: "https://c.saavncdn.com/627/Prem-Geet-Hindi-2008-20240829154212-500x500.jpg",
    audioUrl: "https://aac.saavncdn.com/627/45e62961d6f840393516913cdd3cb1b5_320.mp4",
    duration: 291
  },
  {
    id: 15,
    title: "Mera Piya Ghar Aaya",
    artist: "Nusrat Fateh Ali Khan",
    cover: "https://c.saavncdn.com/296/Yaraana-Hindi-1995-500x500.jpg",
    audioUrl: "https://aac.saavncdn.com/296/d74b64d8422571668142ac1d918728b1_320.mp4",
    duration: 373
  },
  {
    id: 16,
    title: "Chehra Hai Ya Chand Khila Hai",
    artist: "Kishore Kumar",
    cover: "https://c.saavncdn.com/356/SacStar-Hindi-2021-20210816153022-500x500.jpg",
    audioUrl: "https://aac.saavncdn.com/356/34c675acc7adf89d700f0281c2be2fbb_320.mp4",
    duration: 335
  },
  {
    id: 17,
    title: "Mann Ki Lagan",
    artist: "Rahat Fateh Ali Khan",
    cover: "https://c.saavncdn.com/209/Mann-Ki-Lagan-Hindi-2021-20210319100806-500x500.jpg",
    audioUrl: "https://aac.saavncdn.com/209/1c4533e1433519691f5ab6949a41e99c_320.mp4",
    duration: 271
  },
  {
    id: 18,
    title: "Chura Liya Hai Tumne Jo Dil Ko",
    artist: "Asha Bhosle & Mohammed Rafi",
    cover: "https://c.saavncdn.com/854/Yaadon-Ki-Baaraat-Hindi-1973-20200622062706-500x500.jpg",
    audioUrl: "https://aac.saavncdn.com/854/a48723fa6382061a3db02b90c5c0bd43_sar_320.mp4",
    duration: 289
  },
  {
    id: 19,
    title: "Kali Kali Zulfon Ke",
    artist: "Nusrat Fateh Ali Khan",
    cover: "https://c.saavncdn.com/566/Kali-Kali-Zulfon-Ke-Phanday-Na-Daalo-Urdu-2025-20251117050900-500x500.jpg",
    audioUrl: "https://aac.saavncdn.com/566/9cf11c21ffc7f96dbd81ae326c060f09_320.mp4",
    duration: 334
  },
  {
    id: 20,
    title: "Dil Kya Kare",
    artist: "Kishore Kumar",
    cover: "https://c.saavncdn.com/951/70s-Special-Hindi-Hindi-2026-20260629180528-500x500.jpg",
    audioUrl: "https://aac.saavncdn.com/951/1c992ece78ba25405bb95a8bb1621b70_320.mp4",
    duration: 404
  },
  {
    id: 21,
    title: "Likhe Jo Khat Tujhe",
    artist: "Mohammed Rafi",
    cover: "https://c.saavncdn.com/743/Kanyadaan-Hindi-1968-20171213-500x500.jpg",
    audioUrl: "https://aac.saavncdn.com/743/8f736df7477f942707b8c3af1379c29c_sar_320.mp4",
    duration: 273
  },
  {
    id: 22,
    title: "Afreen Afreen",
    artist: "Nusrat Fateh Ali Khan",
    cover: "https://c.saavncdn.com/728/Afreen-Afreen-Urdu-2022-20220802031813-500x500.jpg",
    audioUrl: "https://aac.saavncdn.com/728/be3245a8b4bdcfca3c2c9ce62e81a8f7_320.mp4",
    duration: 400
  },
  {
    id: 23,
    title: "Pyar Deewana Hota Hai",
    artist: "Kishore Kumar",
    cover: "https://c.saavncdn.com/715/Kati-Patang-Hindi-1970-500x500.jpg",
    audioUrl: "https://aac.saavncdn.com/715/ffb496de66c2b6d5eb7885668815b520_sar_320.mp4",
    duration: 284
  },
  {
    id: 24,
    title: "Tum Itna Jo Muskura Rahe Ho",
    artist: "Jagjit Singh",
    cover: "https://c.saavncdn.com/791/Arth-Hindi-1982-500x500.jpg",
    audioUrl: "https://aac.saavncdn.com/791/ec53acb091287414330ae9040b3a98a0_sar_320.mp4",
    duration: 321
  },
  {
    id: 25,
    title: "Na To Caravan Ki Talash Hai",
    artist: "Mohammed Rafi, Manna Dey & Asha Bhosle",
    cover: "https://c.saavncdn.com/175/Barsaat-Ki-Raat-Hindi-1960-20200831163807-500x500.jpg",
    audioUrl: "https://aac.saavncdn.com/175/c338a0eb4b995b81cb30639d5d629eab_sar_320.mp4",
    duration: 708
  },
  {
    id: 26,
    title: "Teri Deewani",
    artist: "Kailash Kher",
    cover: "https://c.saavncdn.com/364/Best-of-Me-Kailash-Kher-Hindi-2013-20200715065511-500x500.jpg",
    audioUrl: "https://aac.saavncdn.com/364/48520ff8b9b3d460975eb963de561de4_320.mp4",
    duration: 320
  }
];
