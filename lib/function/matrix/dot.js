'use strict';

var size = require('../../utils/array').size;

function factory (type, config, load, typed) {
  var add      = load(require('../arithmetic/add'));
  var multiply = load(require('../arithmetic/multiply'));

  /**
   * Calculate the dot product of two vectors. The dot product of
   * `A = [a1, a2, a3, ..., an]` and `B = [b1, b2, b3, ..., bn]` is defined as:
   *
   *    dot(A, B) = a1 * b1 + a2 * b2 + a3 * b3 + ... + an * bn
   *
   * Syntax:
   *
   *    math.dot(x, y)
   *
   * Examples:
   *
   *    math.dot([2, 4, 1], [2, 2, 3]);       // returns number 15
   *    math.multiply([2, 4, 1], [2, 2, 3]);  // returns number 15
   *
   * See also:
   *
   *    multiply, cross
   *
   * @param  {Array | Matrix} x     First vector
   * @param  {Array | Matrix} y     Second vector
   * @return {number}               Returns the dot product of `x` and `y`
   */
  var dot = typed('dot', {
    'Matrix, Matrix': function (x, y) {
      return _dot(x.toArray(), y.toArray());
    },

    'Matrix, Array': function (x, y) {
      return _dot(x.toArray(), y);
    },

    'Array, Matrix': function (x, y) {
      return _dot(x, y.toArray());
    },

    'Array, Array': _dot
  });
  
  dot.toTex = {2: '\\left(${args[0]}\\cdot${args[1]}\\right)'};

  return dot;

  /**
   * Calculate the dot product for two arrays
   * @param {Array} x  First vector
   * @param {Array} y  Second vector
   * @returns {number} Returns the dot product of x and y
   * @private
   */
  // TODO: double code with math.multiply
  function _dot(x, y) {
    var xSize= size(x);
    var ySize = size(y);
    var len = xSize[0];
	

    if (xSize.length !== 1)
	{
		if(xSize[0]==1)
		{
		x=x[0,0];
		var xSize = size(x);
		var len = xSize[0];
		}
		else
		{
			throw new RangeError('Expecting vectors');
		}
			
		
	}
	
	if (ySize.length !== 1)
	{
		if(ySize[0]==1)
		{
		y=y[0,0];
		var ySize = size(y);
		}
		else
		{
			throw new RangeError('Expecting vectors');
		}
			
	}
	


		
    if (xSize[0] != ySize[0]) throw new RangeError('Vectors must have equal length (' + xSize[0] + ' != ' + ySize[0] + ')');
    if (len == 0) throw new RangeError('Cannot calculate the dot product of empty vectors');

    var prod = 0;
    for (var i = 0; i < len; i++) {
      prod = add(prod, multiply(x[i], y[i]));
    }

    return prod;
  }
}

exports.name = 'dot';
exports.factory = factory;
