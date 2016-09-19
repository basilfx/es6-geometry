import Point from '../src/Point';
import Line from '../src/Line';

describe('A line', () => {
    it('has infinite length', () => {
        const a = new Point(100, 100);
        const b = new Point(200, 200);

        const line = new Line(a, b);

        expect(line.length).toBe(Infinity);
    });
});
