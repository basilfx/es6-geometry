import LineSegment from '../src/LineSegment';
import Point from '../src/Point';

describe('A line segment', () => {
    it('has finite length', () => {
        const a = new Point(100, 100);
        const b = new Point(200, 100);

        const lineSegment = new LineSegment(a, b);

        expect(lineSegment.length).toBe(100);
    });
});

describe('Via operations, a line segment', () => {
    it('has an intersection', () => {
        const a = new LineSegment(
            new Point(0, 0),
            new Point(5, 5)
        );
        const b = new LineSegment(
            new Point(0, 5),
            new Point(5, 0)
        );

        const c = a.intersection(b);

        expect(c.x).toBe(2.5);
        expect(c.y).toBe(2.5);
    });
    it('has no intersection', () => {
        const a = new LineSegment(
            new Point(3, 0),
            new Point(3, 4)
        );
        const b = new LineSegment(
            new Point(0, 5),
            new Point(5, 5)
        );

        const c = a.intersection(b);

        expect(c).toBe(null);
    });
});
