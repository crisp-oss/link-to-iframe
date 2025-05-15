import { linkToIframe, getAllTransformers } from "../src/index";

describe("linkToIframe", () => {
  describe("YouTube transformer", () => {
    it("transforms youtube.com URL", () => {
      const result = linkToIframe("https://www.youtube.com/watch?v=dQw4w9WgXcQ");
      expect(result).toContain("src=\"https://www.youtube.com/embed/dQw4w9WgXcQ\"");
      expect(result).toContain("width=\"560\"");
      expect(result).toContain("height=\"315\"");
      expect(result).toContain("allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\"");
      expect(result).toContain("allowfullscreen");
    });

    it("transforms youtu.be URL", () => {
      const result = linkToIframe("https://youtu.be/dQw4w9WgXcQ");
      expect(result).toContain("src=\"https://www.youtube.com/embed/dQw4w9WgXcQ\"");
      expect(result).toContain("width=\"560\"");
      expect(result).toContain("height=\"315\"");
    });
  });

  describe("Loom transformer", () => {
    it("transforms loom URL", () => {
      const result = linkToIframe("https://www.loom.com/share/abcdef123456");
      expect(result).toContain("src=\"https://www.loom.com/embed/abcdef123456\"");
      expect(result).toContain("width=\"560\"");
      expect(result).toContain("height=\"315\"");
      expect(result).toContain("frameborder=\"0\"");
      expect(result).toContain("allowfullscreen");
    });
  });

  describe("Typeform transformer", () => {
    it("transforms form.typeform.com URL", () => {
      const result = linkToIframe("https://form.typeform.com/to/abc123xyz");
      expect(result).toContain("src=\"https://form.typeform.com/to/abc123xyz?typeform-embed=embed-widget\"");
      expect(result).toContain("width=\"640\"");
      expect(result).toContain("height=\"500\"");
      expect(result).toContain("frameborder=\"0\"");
      expect(result).toContain("allow=\"camera; microphone; autoplay; encrypted-media; fullscreen; picture-in-picture;\"");
      expect(result).toContain("allowfullscreen");
    });

    it("transforms workspace.typeform.com URL", () => {
      const result = linkToIframe("https://myworkspace.typeform.com/to/abc123xyz");
      expect(result).toContain("src=\"https://myworkspace.typeform.com/to/abc123xyz?typeform-embed=embed-widget\"");
      expect(result).toContain("width=\"640\"");
      expect(result).toContain("height=\"500\"");
    });
  });

  describe("Options", () => {
    it("applies default attributes", () => {
      const result = linkToIframe("https://youtu.be/dQw4w9WgXcQ", {
        defaultAttributes: {
          width: 640,
          height: 480,
          class: "custom-iframe",
        },
      });
      expect(result).toContain("width=\"640\"");
      expect(result).toContain("height=\"480\"");
      expect(result).toContain("class=\"custom-iframe\"");
    });

    it("overrides transformer attributes with default attributes", () => {
      const result = linkToIframe("https://youtu.be/dQw4w9WgXcQ", {
        defaultAttributes: {
          width: 800,
          height: 600,
        },
      });
      expect(result).toContain("width=\"800\"");
      expect(result).toContain("height=\"600\"");
      expect(result).not.toContain("width=\"560\"");
      expect(result).not.toContain("height=\"315\"");
    });

    it("allows custom transformers", () => {
      const result = linkToIframe("https://example.com/custom-video/123", {
        additionalTransformers: [
          {
            pattern: /example\.com\/custom-video\/(\d+)/,
            transform: (_url, matches) => ({
              src: `https://example.com/embed/${matches[1]}`,
              width: 400,
              height: 300,
            }),
            key: "custom-video",
            name: "Custom Video",
          },
        ],
      });
      expect(result).toContain("src=\"https://example.com/embed/123\"");
      expect(result).toContain("width=\"400\"");
      expect(result).toContain("height=\"300\"");
    });

    it("returns attributes object when returnObject is true", () => {
      const result = linkToIframe("https://youtu.be/dQw4w9WgXcQ", {
        returnObject: true,
      });
      expect(typeof result).toBe("object");
      expect(result).not.toBeNull();
      expect(result).toHaveProperty("src", "https://www.youtube.com/embed/dQw4w9WgXcQ");
      expect(result).toHaveProperty("width", 560);
      expect(result).toHaveProperty("height", 315);
      expect(result).toHaveProperty("allowfullscreen", true);
    });

    it("applies default attributes when returning object", () => {
      const result = linkToIframe("https://youtu.be/dQw4w9WgXcQ", {
        returnObject: true,
        defaultAttributes: {
          width: 800,
          height: 600,
          class: "custom-iframe",
        },
      });
      expect(typeof result).toBe("object");
      expect(result).not.toBeNull();
      expect(result).toHaveProperty("src", "https://www.youtube.com/embed/dQw4w9WgXcQ");
      expect(result).toHaveProperty("width", 800);
      expect(result).toHaveProperty("height", 600);
      expect(result).toHaveProperty("class", "custom-iframe");
    });
  });

  it("returns null if no transformer matches", () => {
    const result = linkToIframe("https://example.com/no-match");
    expect(result).toBeNull();
  });

  it("returns null if no transformer matches with returnObject option", () => {
    const result = linkToIframe("https://example.com/no-match", { returnObject: true });
    expect(result).toBeNull();
  });
});

describe("getAllTransformers", () => {
  it("returns an array of transformer info objects", () => {
    const transformers = getAllTransformers();
    
    // Check that it's an array with items
    expect(Array.isArray(transformers)).toBe(true);
    expect(transformers.length).toBeGreaterThan(0);
    
    // Check structure of the first transformer
    const firstTransformer = transformers[0];
    expect(firstTransformer).toHaveProperty("key");
    expect(firstTransformer).toHaveProperty("name");
    expect(firstTransformer).toHaveProperty("priority");
    expect(typeof firstTransformer.key).toBe("string");
    expect(typeof firstTransformer.name).toBe("string");
    expect(typeof firstTransformer.priority).toBe("number");
  });
  
  it("sorts transformers by priority (highest first)", () => {
    const transformers = getAllTransformers();
    
    // Check that the array is sorted by priority (descending)
    for (let i = 0; i < transformers.length - 1; i++) {
      expect(transformers[i].priority).toBeGreaterThanOrEqual(transformers[i + 1].priority);
    }
  });
  
  it("handles additional transformers", () => {
    const customTransformer = {
      key: "custom-test",
      name: "Custom Test",
      priority: 100,
      pattern: /test/,
      transform: () => ({ src: "test" }),
    };
    
    const transformers = getAllTransformers({
      includeAdditional: [customTransformer],
    });
    
    // First transformer should be our custom one with high priority
    expect(transformers[0].key).toBe("custom-test");
    expect(transformers[0].name).toBe("Custom Test");
    expect(transformers[0].priority).toBe(100);
  });
}); 