var express = require('express');
var router = express.Router();
var request = require('request');
var parser = require('xml2json');

/* GET address listing. */
router.get('/', function(req, res, next) {
  var currentPage = parseInt(req.query.currentPage || '1', 10);
  var countPerPage = parseInt(req.query.countPerPage || '10', 10);
  var keyword = (req.query.keyword || '').trim();

  if (!keyword) {
    var err = new Error('keyword required!');
    return next(err);
  }

  var options = {
    uri: 'http://www.juso.go.kr/addrlink/addrLinkApi.do',
    method: 'get',
    qs: {
      currentPage: currentPage,
      countPerPage: countPerPage,
      keyword: keyword,
      confmKey: 'your api key'
    }
  };
  request(options, function(err, response, body) {
    if (err) {
      return next(err);
    }
    if (response.statusCode !== 200) {
      return next(new Error(JSON.parse(parser.toJson(body))));
    }
    res.send(JSON.parse(parser.toJson(body)));
  });
});

module.exports = router;
