import Vector from '../src/Vector';

describe('A vector', () => {
    it('can be created from an array', () => {
        const vector = Vector.fromArray([100, 200]);

        expect(vector.x).toBe(100);
        expect(vector.y).toBe(200);
    });
    it('can be created from an object', () => {
        const vector = Vector.fromObject({
            x: 10,
            y: 20,
        });

        expect(vector.x).toBe(10);
        expect(vector.y).toBe(20);
    });
    it('can be created from a number', () => {
        const vector = Vector.fromNumber(100);

        expect(vector.x).toBe(100);
        expect(vector.y).toBe(100);
    });
});

describe('Via operations, a rectangle', () => {
    const vector = new Vector(10, 10);

    it('can be inverted', () => {
        const newVector = vector.invert();

        expect(newVector.x).toBe(-10);
        expect(newVector.y).toBe(-10);
    });
});
