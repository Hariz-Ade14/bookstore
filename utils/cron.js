import cron from "cron";
import https from "https";
import dotenv from "dotenv";
dotenv.config();


const job = new cron.CronJob("*/14 * * * *", () => {
      https.get(process.env.API_URL, (res) => {
            if(res.statusCode === 200) {
                  console.log("Cron job executed successfully");
            }
            else {
                  console.log("Error executing cron job: ", res.statusCode);
            }
      }).on("error", (e) => {
            console.error(`Error: ${e.message}`);
      });
});

export default job;