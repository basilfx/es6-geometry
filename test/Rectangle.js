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

        expect(rectangle.a.x).to.equal(100);
        expect(rectangle.a.y).to.equal(100);
        expect(rectangle.b.x).to.equal(200);
        expect(rectangle.b.x).to.equal(200);
    });
    it('can be created from an array', () => {
        const source = [[100, 100], [200, 200]];

        const rectangle = Rectangle.fromArray(source);

        expect(rectangle.a.x).to.equal(100);
        expect(rectangle.a.y).to.equal(100);
        expect(rectangle.b.x).to.equal(200);
        expect(rectangle.b.x).to.equal(200);
    });
});

describe('Via operations, a rectangle', () => {
    const rectangle = new Rectangle(
        new Point(100, 100),
        new Point(200, 200),
    );

    it('can be expanded', () => {
        it('with a positive vector', () => {
            const vector = Vector.fromNumber(25);
            const newRectangle = rectangle.expand(vector);

            expect(newRectangle.a.x).to.equal(75);
            expect(newRectangle.a.y).to.equal(75);
            expect(newRectangle.b.x).to.equal(225);
            expect(newRectangle.b.y).to.equal(225);
        });
        it('with a negative vector', () => {
            const vector = Vector.fromNumber(-25);
            const newRectangle = rectangle.expand(vector);

            expect(newRectangle.a.x).to.equal(125);
            expect(newRectangle.a.y).to.equal(125);
            expect(newRectangle.b.x).to.equal(175);
            expect(newRectangle.b.y).to.equal(175);
        });
    });
});
