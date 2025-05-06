import mongoose from 'mongoose';
import dotenv from 'dotenv';
import questionModel from '../models/question.model';

dotenv.config();

const characters = [
 "Tralalero Tralala",
  "Bombardiro Crocodilo",
  "Tung Tung Tung Tung Tung Tung Tung Tung Tung Sahur",
  "Lirilì Larilà",
  "Boneca Ambalabu",
  "Brr Brr Patapim",
  "Chimpanzini Bananini",
  "Bombombini Gusini",
  "Capuccino Assassino",
  "Trippi Troppi",
  "Frigo Camelo",
  "La Vaca Saturno Saturnita",
  "Ballerina Cappucina",
  "U Din Din Din Din Dun Ma Din Din Din Dun",
  "Trulimero Trulicina",
  "Girafa Celestre",
  "Bobrito Bandito",
  "Frulli Frulla",
  "Ta Ta Ta Ta Ta Ta Ta Ta Ta Ta Ta Sahur",
  "Brri Brri Bicus Dicus Bombicus",
  "Tric Trac Baraboom",
  "Cocofanto Elefanto",
  "Burbaloni Lulilolli",
  "Orangutini Ananasini",
  "Garamaraman dan Madudungdung tak tuntung perkuntung",
  "Il Cacto Hipopotamo",
  "Blueberrinni Octopussini",
  "Glorbo Fruttodrillo",
  "Rhino Toasterino",
  "Zibra Zubra Zibralini",
  "Graipussi Medussi",
  "Tigrrullini Watermellini",
  "Tracotucotulu Delapeladustuz",
  "Chimpanzini Capuchini",
  "Gorillo Watermellondrillo",
  "Bananita Dolfinita",
  "Tigroligre Frutonni"
];

const imageUrls = [
    "https://i.namu.wiki/i/BL3Pgpfyex-VbBun1a5iZxEvm7Rnw84CBACN-KAEkYlBjiTTicxJDxFyYKzRZ3eRT7N3YeDA3U-QLaEYi5WDGT3c5KybRdzYWS6gPz50KQikLnHkxkh0PszNMvYnDsUNZ1xnDbZx6kBp5fvOiaYZhA.webp",
    "https://i.namu.wiki/i/yp6WfiksMaATAn0ji-ylK4nSr-HWvqKkLAE1g8thLsI9ZIRTVmcv5p_8NVqxYAC44q6wQVy8JUsSq7ySaCIXQqgRiT94ho_xPVhHw387HQmRqM-dTmf7XgX2urdkUVYwcmqyCsZsj3ctAM2OkUH4Lw.webp",
  "https://i.namu.wiki/i/vGbhbartrDAsbwBmkt_Xt6AmhXhhuU9XbLuS1k5_ac3gAFsW4lMuPrLtJidKvTXSXH2ml6ppXH-twATGyjAUG9v1IuRs8jeem1fvXHfr4180pl3YB6IQnoyiOonBfFbVdHcQiqeNtks4snvC2bQchQ.webp",
  "https://i.namu.wiki/i/OYz8H-iKHlrJ-ak_xVJ1VnngILfgwKIvU6oJ9c04vjfIGw5CygOw_NKWYmD_r3m13LHeq8DqrKvQ-MhjZtpYbKBUfkzLZ0TDKHM6ldZuupwbCIS-JpdZbyTun7ju5DiPWHq2QHT5e-d8lVHJz_Af5A.webp",
  "https://i.namu.wiki/i/O50A2-zvt--r7VEY1Z5lve5EzK1clvktmnofLKv0vGBO9MdXnIvSoqlewbBlnL5dBB_xe0y93xFupa40pv8s6u6YZ7CYmZjeiOCCr9Z6U7l7BiLXbN_dfSjJVKZYscaTQxxC3KNK5wv3_QvlZcvx4Q.webp",
  "https://i.namu.wiki/i/Rn9DAkuAoHvoskYZvExkCLYDIbUuMW2fbVQPUluRL2Cm2kuoAndEy-iBB032kfPrIzHVGSaO_RLZIeZtdn5CO50NmGweBP0ZayfDvCFhk4ESuRtQlYvBIZIJAAEogR1ljrNmFOe_i_B2dji67LNTyQ.webp",
  "https://i.namu.wiki/i/FwmKrHOG2JasIotXHsdMqjWo0iVYRKxc-fGT3_djgLMU2B7Osp1rIFPvFzYDVyOdZCWreTyK2-T_SvPSAQBMtMdg5_tHrYlpndFUPU0Xip_MvHyLBhphYxrrgArHAVp2xmup0I_kCccXCaC_lxOsTA.webp",
  "https://i.namu.wiki/i/GxSf7W5YTBJJ4lxDhMpRE0JUEa_6XryUvqjytpmO6BnxDXe2JnA6WvGHZ2mN1Mj6QuBdlyTUilCBZjMNklEe0BSMjNI1t7kLGJQlzTgXzh2TB8Bn9XidjfkjuPJQoSYZlNUm3eC7wWEus7bySaQxsw.webp",
  "https://i.namu.wiki/i/lpuyrD5GQxI1LCLuQzdVTKyWD8TEic7OuthUu0Qb9WSX5eZf3OyBcmS_z8cuq-YXIJtb1tb8bZMnyCrDFxB8xDYyXAtOYJTcSkUDEr0O49k1lAb9ymEhv363BZ1AeiEljoF22WBHcuReitU2Gxj_IQ.webp",
  "https://i.namu.wiki/i/3pTGhbj0ZXr2REGhkyrB7K1BsJD4WbhiB9XeEMkcyJc5ZsgQa1aI8DlIK8kfkXu8uQaea_BHdCin3Wt8tCvehFTmU1pB45esLMD6Z0cRnNmZF2M8NAqxX2NcVlJJ9DpRGbTJgj1KqTg-TZ6FqVa9jw.webp",
  "https://i.namu.wiki/i/bAcRZgrLoII55iCHDf7otPJiS2zF-YcG2L1IUfzZmRdlpjoucUEEzPuiVZnmftwgWL30aPdEj3EHQJTfMB83LRJ6qeCovuSsqFxP9H6q1QMPZWM_TFrb5WB2RII2EkEC67SHJZzdCo13zUNe1Qiy6g.webp",
  "https://i.namu.wiki/i/yCi8Yg-uRBm7voBVRLaKGzh-g3v1YOlBpGC1y1CjYw3CyMe0np2ct39YULaRaDGZo0wglDv7fPuk48ybsgBgP5AwbcOkDdJYg3nOuUJHHma5VQgy6VhPSljFfcSw5BCP3uTgrPkRaL5cP-zV9Fz8_g.webp",
  "https://i.namu.wiki/i/pMfOJXF9OMQssCi1lBsQSVkYf4V7_RL6bDyIcBenGeREnffXiW24MCFnqYyckSfIVJmBMuy81B9MvH4jwGy7SbjkQS_3mWAWAacbWLaf8Fjwu8H6FjPTvsfJu3N1k6PJKlHE0d7c5VSKY6pN8N04aw.webp",
  "https://i.namu.wiki/i/M9FoMf5sOoC2eXksO4tFjoyiAIN1vXSkLube5ybvAey7Wfe0LliRVKc-LejOXRMyDyCFnaIHBQzDAnUQtBFiGB9JrtXvyGgidJ0vM-UcOVtJQakWF1FCMEHnrdtfH8dMQFLfNYPaRr9MjKKeJ9na2w.webp",
  "https://i.namu.wiki/i/yHPTK2RuXammlAs29fwo3iLtScuQHVej7EU_JhE5ZgvZtjRE-onbjc7KjdkFokjHRXLi8nzjAX1IN_4SaQirl7g826dwkHjfVehzrRMDacRSzkSvUGf9uq7-jcXKwriLLPWWeOGqM3rqPOvOkcvBAw.webp",
  "https://i.namu.wiki/i/2sXi2G8Lwz8OegsEvls0qijaqYpLOVNhr6kAst6HmJ161OPjAdcH2UBmlL-Br7g1Ndv1kDvWpXSc1S8owEYCfLLM-g1MbYY927nhbRlM-5cWv6-53pt-e27C4Q6Le6tifrMl0SDeWVJpt1GG2LxInQ.webp",
  "https://i.namu.wiki/i/r0jV5QVrB-x5fbAnUZ1YmHYfAzP0nwmdtY75317OOjbGP3LtUiX7IKzEZqV_HWaUKxLsDfSaAA4QZc1_xquzP2AqCjg29FpxcaYYOR4MG5qAStB8G3lMufPNvyBh1xsmqVetEEu7akiRZX_LBQgCuw.webp",
  "https://i.namu.wiki/i/z1KQFtGAAoAxa2G746TFF2ICFB2UZjMQ7B4tZU3WXjPQdjI4CZykSWMUABOnNTsFR8hoG4A8zdMKRHcrnwRSILGFnvRhDEVF0owZcRjB5rqIwFo5SpvoB7a_LdKcLT8S8NNSUynWii5UajJ0FrUxpA.webp",
  "https://i.namu.wiki/i/pNnQE5J-eJX-S-m9M9gauBBTjIhOYjSNd75CFPQg8z41LNxwhNC6hXgfeYPlX9m5oQ9Jo1RMcWECYnPe--Fzzvs-V3ebzQtjzPFSL4M8MhrWhR_7UwL1RlFHLqlhqunjji40tmMVd_S99eX989pCoQ.webp",
  "https://i.namu.wiki/i/_O5Z98rIYglq8mnLcFZpCB7mAq4pmzSTxAZdHdZl77yL_bYyM-rOzfEJ_hVGcZOQvzaZY3g_PcXP428T5MQB-B7KoqtA_Fk7xPiGFzJvdFv29SQhOjOWlFSQAGP4RumALd9crnQI6RA9zLz9r2YseQ.webp",
  "https://i.namu.wiki/i/CXUlUvQOoe-04PUTGYZfXED1U3sm9vBUdx-Imtqn1fYFXZXkHzs6AQUpM604LNImdI0Buz68MVnETIA9aKTzwjjqKyTBRNvfXyjT4BzuzfHw0NdIAcNciVha4GUYJmrViKbzt_JgkBdBoTKlcAovCA.webp",
  "https://i.namu.wiki/i/a4k3KP2-vdwgijpJAviYFotx4EicXQf5Knga7V6Om3ffhDwY1VOglZMkGq4OdvbtIhytdEDmBFcsGT1-TZEoXc8HD7T-ywltKIMx4q8HKKe7vvHxc2YOO_FQeUVreUyS4O_uJ9PgQztX0F9yVZmJYQ.webp",
  "https://i.namu.wiki/i/WTojsRc_zGLZCBJ6BRIaeeCMOKr81ofVaMer4T9-gxNUITjdCYmlq5o0crMbQOMJBxo8YkvkJ01C56W_0zQhunt_YzhACJYRXrYfNv7Vba_yisf_o5urmZAVO4axHmXZgL-MKfCaaJ8MJA3fxGZyxg.webp",
  "https://i.namu.wiki/i/433ABd9tgV34p-iEwDfMHgU3c1H5-W0iTmfTFZb1om6Vb-sk-B1FFORH8dLHFDGPK5HeGd9kIXxe1O6boHfK5A3XLCkHZ_g1QwsqsIpDXQyNCGRjFcwi7O6bDjsowRBEE1pJt8ecf4SFpjzyBEyVvw.webp",
  "https://i.namu.wiki/i/KygwxCIMbTB5mjmApZHJ27tVd-rSmX9cqF8eaj4gt-7ICBX8T09-Oqs6ZyR3mvqh2LPYyrXiLmwQRptldzBzVR5thSixP2kTpdOflw5cch17pFJIZJZ3DzzBm7MiDKZNYYyL5AbVW050xPyhDUr9Mg.webp",
  "https://i.namu.wiki/i/H9X_6Jd3232C2xZl7AsrDe-g06i9zbPMKBvySqCEIICUpHitZTTNNWmWJ8U4CA9rLBq39yZuE6kDJpnECPHB4PHrOjMV3pJMWKOtT0q1Gx2DrW11WtdVYz1f43MuaeHfhNEflQaedR4ygWexZVrUoA.webp",
  "https://i.namu.wiki/i/9Gzo6Z_EvOnkp2qz1JxHfV7GwuaIRZi7ZR_nNwiA2qCmETy2yAGrqyBGhsz27oh-_V0AHSV51sdxFjfihRuYiyGiCEKe66zdLjYHnt37q7-AAFJDrPkFnUWm3mk9yhF0XoAB_CQBgA7zwO-XZUgDqw.webp",
  "https://i.namu.wiki/i/DlkakmgBNpCqZA0hf1WHAwq5QgBHJ_mZDOye80H3nRhGTEhlYrca9sLkVVArinqJuAQKrA8psuF1AlfPyMGJhkfX2vsDq1kp4ux4PX70wixQqj-97xQboJhCDJAvipUJ99Spcg6B4WNdXSFQqSpGsg.webp",
  "https://i.namu.wiki/i/HCUCiFtxfFmqLkz5yM5SgsB0dleYxL9XD06B2xe2kstTP2ChFK2faOfhNl8B0aMhlaMOOSmxHtrHDgxYOnEaQRtiBJrRVKb3GoyMkd24oOjK8kY_-nFVCe0hUnVntG99HfFuhcmymOVH8CJOXU_vCw.webp",
  "https://i.namu.wiki/i/-wpc8cjlmBbV1flK6ljRNv8DRCBfMxVNhUtX-E8Lor00UfKi1OHZIeIcNhkv5pdQ5aXi4p4qQKiPzsKnRTZ1aKcO7gbctcfIRVvVOFMfYM0J_qkxYgfZucsZPd8SzRb0YTTebULeJG76_LGfn8G0Hg.webp",
  "https://i.namu.wiki/i/VsaDxz7UyYOtkFLVWNkzRN96oSfI5Vli-DTAiapUkfY5WazKTqKCAXloiTIZGZfTgW4muceehWAWU28MdSzMnomMRjtyyPPPm1YMG6elH9SXOkHogPLZE_FuvRhrOWnA0t7EnwKCuQTqp-hvjCtJYw.webp",
  "https://i.namu.wiki/i/0OySWG1WexC-mnXZNhKta9aCqr353cpXrqj_8gPR_ntYfqnogYtOndXXqt_H6NJDvYeYdaiOeJ6VX6vijKnL0zkO1NX7wWO_Vpq3RAUcLgj5Njp345-rLdENJS5D61X4pd_P5s9zeTTRyBLrBooMlA.webp",
  "https://i.namu.wiki/i/bob9aLiO_bld1MXUEzw8ZdvvRv1z9zyWWoj-dfWJ-2LfrQr0-_9rQHplA93EtPx-qjKgPCe0xfKOOBoKO8pNoFr6KLQf-4T-NJTrBA0FBKNgFe0CDYa3ZoZxotM3ihCyE55cTYnNd1fcg8aor1irxw.webp",
  "https://i.namu.wiki/i/OTZeas7ynDfolpoX_nZW1KrRdbs42Ms8wOQlBM819bjKM_grJtVbHGv1I2NzccNPrwjmNz6dghG6fG7YM_aEm8NmFBpwap0ugrHgeq9pXi1UVKCU76e7CkZ2zbwuwzHomCorUM4D_t-g1L5wbqpG9w.webp",
  "https://i.namu.wiki/i/9e7TfttGbxr7tTLfnIhYwOnJS3ha4VwVz6npDwK2uwYP1QDuXo1n65MXqr4zu95PdyClSnKHohUsdGamPta8fhL4OLVU-7kqzXxl8_3V4BiBwz74My1WLYd4G99kZxTdgPvofjuvOOsA14_wZjwVWA.webp",
  "https://i.namu.wiki/i/ZE0DdCZivvWRpAQV-NkfmRzf5cdEQeGHbvTpkzXUdr-E9v1CigDn6mVy9UH6DWTaF-dc2O-pATzJKeVgA8ALkIUY6K6RoV7ELu4qkbMV5T08QKVGoalPt1zVDuQfZiKxlQXuAhHLDlCUXOO5pvPPRw.webp",
  "https://i.namu.wiki/i/BwZhZgOM-Y66a6dCdsVk5WqC0pBBKcPGNfBdTwLdup445FbGcPdiVyfVMSiHm9MfOmDu5YoRURGkbPedGRNqXifhFKYjvxgiFvFC23UtEai4Qb3RTvjQ38NRBlZagBz5o1RcAC7f_UGTRQF2FvXsJg.webp"
]

async function insertQuestions() {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI is not defined in the environment variables');
    }
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    await questionModel.deleteMany({});

    const questions = characters.map((character, index) => {
      const image = imageUrls[index];

      const optionsSet = new Set<number>();
      while (optionsSet.size < 4) {
        const rand = Math.floor(Math.random() * characters.length);
        if (rand !== index) optionsSet.add(rand);
      }
      optionsSet.add(index);

      const optionsIndices = Array.from(optionsSet);
      for (let i = optionsIndices.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [optionsIndices[i], optionsIndices[j]] = [optionsIndices[j], optionsIndices[i]];
      }
      const optionsNames = optionsIndices.map(i => characters[i]);

      const correctName = characters[index];

      return {
        _id: new mongoose.Types.ObjectId(),
        image,
        options: optionsNames,
        answer: correctName, 
        characterName: character
      };
    });

    await questionModel.insertMany(questions);
    console.log(`Inserted ${questions.length} questions successfully`);
  } catch (error) {
    console.error('Error inserting questions:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

insertQuestions();