module.exports = function(app) {
  class estatics {
    constructor(app) {
      this.statics = {
        GET: 0,
        POST: 0,
        PUT: 0,
        DELETE: 0,
        TOTAL: 0,
        LAST_MS: 0,
        AVG_MS: 0,
        MIN_MS: 0,
        MAX_MS: 0,
        TOTAL_MS: 0
      };
      this.counter = this.counter.bind(this);

      if (app) {
        this.app = app;
        this.app.get("/e-statics", (req, res) => {
          res.json(this.statics);
        });
      }

      // Compare min ms
      this.MIN_MS = ms => {
        if (this.statics.MIN_MS > ms || this.statics.MIN_MS == 0)
          this.statics.MIN_MS = ms;
      };
      // compare max ms
      this.MAX_MS = ms => {
        if (this.statics.MAX_MS < ms) this.statics.MAX_MS = ms;
      };
    }
    counter(req, res, next) {
      if (req.path == "/e-statics") {
        next();
      } else {
        const startHrTime = process.hrtime();
        this.statics[req.method]++;
        this.statics.TOTAL++;
        res.on("finish", () => {
          const elapsedHrTime = process.hrtime(startHrTime);
          const elapsedTimeInMs =
            elapsedHrTime[0] * 1000 + elapsedHrTime[1] / 1e6;
          this.MIN_MS(elapsedTimeInMs);
          this.MAX_MS(elapsedTimeInMs);
          this.statics.LAST_MS = elapsedTimeInMs;
          this.statics.TOTAL_MS = this.statics.TOTAL_MS + elapsedTimeInMs;
          this.statics.AVG_MS = this.statics.TOTAL_MS / this.statics.TOTAL;
        });
        next();
      }
    }
    get stats() {
      return this.statics;
    }
  }
  return new estatics(app);
};
