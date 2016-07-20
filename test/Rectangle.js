import Point from '../src/Point';
import Rectangle from '../src/Rectangle';
import Vector from '../src/Vector';

describe('A rectangle', () => {
    it('can be created from an object', () => {
        const sourceA = {
            x: 100,
            y: 100,
        };
        const sourceB = {
            x: 200,
            y: 200,
        };

        const rectangle = Rectangle.fromObject({ a: sourceA, b: sourceB });

        expect(rectangle.a.x).toBe(100);
        expect(rectangle.a.y).toBe(100);
        expect(rectangle.b.x).toBe(200);
        expect(rectangle.b.x).toBe(200);
    });
});

describe('Via operations, a rectangle', () => {
    const rectangle = new Rectangle(
        new Point(100, 100),
        new Point(200, 200)
    );

    it('can be expanded', () => {
        it('with a positive vector', () => {
            const vector = Vector.fromNumber(25);
            const newRectangle = rectangle.expand(vector);

            expect(newRectangle.a.x).toBe(75);
            expect(newRectangle.a.y).toBe(75);
            expect(newRectangle.b.x).toBe(225);
            expect(newRectangle.b.y).toBe(225);
        });
        it('with a negative vector', () => {
            const vector = Vector.fromNumber(-25);
            const newRectangle = rectangle.expand(vector);

            expect(newRectangle.a.x).toBe(125);
            expect(newRectangle.a.y).toBe(125);
            expect(newRectangle.b.x).toBe(175);
            expect(newRectangle.b.y).toBe(175);
        });
    });
});
