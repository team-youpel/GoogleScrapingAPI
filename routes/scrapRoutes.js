const express = require('express');
const app = express();
const router = express.Router();
const {
  runCustomProx,
  getAll,
  runIpScrap,
  getbadresults,
  runPremiumProxyScrap,
  bandwidth,
  deletebadresults,
  deleteokresults,
  getAllTasks
} = require('../controllers/scrapContoller');
const rateLimit = require('express-rate-limit');

// ! Limiter
const limiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 1 minutes
  max: 1 // limit each IP to 1 requests per windowMs
});

// ! Routes limiter,limiter
router.route('/runcustomprox').post(runCustomProx);
router.route('/runipscrap').post(runIpScrap);
router.route('/getokresults').get(getAll);
router.route('/getbadresults').get(getbadresults);
router.route('/runpremiumproxyscrap').post(runPremiumProxyScrap);
router.route('/bandwidth').get(bandwidth);
router.route('/deletebadresults').delete(deletebadresults);
router.route('/deleteokresults').delete(deleteokresults);
router.route('/getalltasks').get(getAllTasks);

module.exports = router;
