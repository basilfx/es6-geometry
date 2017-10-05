import Point from '../src/Point';
import Line from '../src/Line';

describe('A line', () => {
    it('can be created from an object', () => {
        const sourceA = {
            x: 100,
            y: 100,
        };
        const sourceB = {
            x: 200,
            y: 200,
        };

        const line = Line.fromObject({ a: sourceA, b: sourceB });

        expect(line.a.x).to.equal(100);
        expect(line.a.y).to.equal(100);
        expect(line.b.x).to.equal(200);
        expect(line.b.y).to.equal(200);
    });
    it('can be created from an array', () => {
        const source = [[100, 100], [200, 200]];

        const line = Line.fromArray(source);

        expect(line.a.x).to.equal(100);
        expect(line.a.y).to.equal(100);
        expect(line.b.x).to.equal(200);
        expect(line.b.y).to.equal(200);
    });
    it('has infinite length', () => {
        const a = new Point(100, 100);
        const b = new Point(200, 200);

        const line = new Line(a, b);

        expect(line.length).to.equal(Infinity);
    });
});
