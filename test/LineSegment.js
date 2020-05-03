import LineSegment from '../src/LineSegment';
import Point from '../src/Point';

describe('A line segment', () => {
    it('can be created from an object', () => {
        const sourceA = {
            x: 100,
            y: 100,
        };
        const sourceB = {
            x: 200,
            y: 200,
        };

        const line = LineSegment.fromObject({ a: sourceA, b: sourceB });

        expect(line.a.x).to.equal(100);
        expect(line.a.y).to.equal(100);
        expect(line.b.x).to.equal(200);
        expect(line.b.y).to.equal(200);
    });
    it('can be created from an array', () => {
        const source = [[100, 100], [200, 200]];

        const line = LineSegment.fromArray(source);

        expect(line.a.x).to.equal(100);
        expect(line.a.y).to.equal(100);
        expect(line.b.x).to.equal(200);
        expect(line.b.y).to.equal(200);
    });
    it('has finite length', () => {
        const a = new Point(100, 100);
        const b = new Point(200, 100);

        const lineSegment = new LineSegment(a, b);

        expect(lineSegment.length).to.equal(100);
    });
});

describe('Via operations, a line segment', () => {
    it('has an intersection', () => {
        const a = new LineSegment(
            new Point(0, 0),
            new Point(5, 5),
        );
        const b = new LineSegment(
            new Point(0, 5),
            new Point(5, 0),
        );

        const c = a.intersection(b);

        expect(c.x).to.equal(2.5);
        expect(c.y).to.equal(2.5);
    });
    it('has no intersection', () => {
        const a = new LineSegment(
            new Point(3, 0),
            new Point(3, 4),
        );
        const b = new LineSegment(
            new Point(0, 5),
            new Point(5, 5),
        );

        const c = a.intersection(b);

        expect(c).to.equal(null);
    });
});
