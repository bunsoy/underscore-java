  function deepEqual(actual, expected, description) {
    it(description, function() {
      expect(actual).toEqual(expected);
    });
  }
  function ok(actual, description) {
    expect(actual).toBe(true);
  }  
  describe('map/flatten/reduce', function() {
    var lyrics = [
      "I'm a lumberjack and I'm okay",
      "I sleep all night and I work all day",
      "He's a lumberjack and he's okay",
      "He sleeps all night and he works all day"
    ];
    var counts = _(lyrics).chain()
      .map(function(line) { return line.split(''); })
      .flatten()
      .reduce(function(hash, l) {
        hash[l] = hash[l] || 0;
        hash[l]++;
        return hash;
    }, {}).value();
    ok(counts.a == 16 && counts.e == 10, 'counted all the letters in the song');
  });

  describe('select/reject/sortBy', function() {
    var numbers = [1,2,3,4,5,6,7,8,9,10];
    numbers = _(numbers).chain().select(function(n) {
      return n % 2 === 0;
    }).reject(function(n) {
      return n % 4 === 0;
    }).sortBy(function(n) {
      return -n;
    }).value();
    deepEqual(numbers, [10, 6, 2], 'filtered and reversed the numbers');
  });

  describe('select/reject/sortBy in functional style', function() {
    var numbers = [1,2,3,4,5,6,7,8,9,10];
    numbers = _.chain(numbers).select(function(n) {
      return n % 2 === 0;
    }).reject(function(n) {
      return n % 4 === 0;
    }).sortBy(function(n) {
      return -n;
    }).value();
    deepEqual(numbers, [10, 6, 2], 'filtered and reversed the numbers');
  });

  describe('reverse/concat/unshift/pop/map', function() {
    var numbers = [1,2,3,4,5];
    numbers = _(numbers).chain()
      .reverse()
      .concat([5, 5, 5])
      .unshift(17)
      .pop()
      .map(function(n){ return n * 2; })
      .value();
    deepEqual(numbers, [34, 10, 8, 6, 4, 2, 10, 10], 'can chain together array functions.');
  });

  describe('chaining works in small stages', function() {
    var o = _([1, 2, 3, 4]).chain();
    deepEqual(o.filter(function(i) { return i < 3; }).value(), [1, 2]);
    deepEqual(o.filter(function(i) { return i > 2; }).value(), [3, 4]);
  });
