describe('JavaScript addition operator', function() {
	//½¨Á¢it¿é
	it('adds two numbers together', function() {
		expect(1 + 2).toEqual(3);
	});
});

describe("Asynchronous specs", function() {
	var value;

	beforeEach(function(done) {
		setTimeout(function() {
			value = 0;
			done();
		}, 1);
	});

	it("should support async execution of test preparation and expectations", function(done) {
		value++;
		expect(value).toBeGreaterThan(0);
		done();
	});
});