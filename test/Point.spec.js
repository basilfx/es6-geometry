import Point from '../src/Point';

// http://jasmine.github.io/2.0/introduction.html

describe("A point", () => {
    it("can be created from an object", () => {
        const source = {
            x: 100,
            y: 200,
        };
        
        const point = new Point.fromObject(source);
        
        expect(point.x).toBe(100);
        expect(point.y).toBe(200);
    });
    it("can be created from an array", () => {
        const source = [100, 200];
        
        const point = new Point.fromArray(source);
        
        expect(point.x).toBe(100);
        expect(point.y).toBe(200);
    });
});