{
  "store": {
    "name": "string",
    "email": "string",
    "presentations": [
      {
        "id": "int",
        "name": "string",
        "description": "string",
        "thumbnail": "File",
        "default-background": {
          "colour": "string", // Hex
          "img": "File"
        },
        "slides": [
          {
            "background-style": {
              "colour": "string", // Hex
              "img": "File"
            },
            "text-elements": [
              {
                "layer": "int",
                "position": {
                  "x": "int",
                  "y": "int"
                },
                "size": {
                  "width": "int",
                  "height": "int"
                },
                "content": "string",
                "font-size": "int",
                "colour": "string" // Hex
              }
            ],
            "image-elements": [
              {
                "layer": "int",
                "position": {
                  "x": "int",
                  "y": "int"
                },
                "size": {
                  "width": "int",
                  "height": "int"
                },
                "file": "File",
                "alt-tag": "string"
              }
            ],
            "video-elements": [
              {
                "layer": "int",
                "position": {
                  "x": "int",
                  "y": "int"
                },
                "size": {
                  "width": "int",
                  "height": "int"
                },
                "url": "string",
                "autoplay": "bool" // optional
              }
            ],
            "code-elements": [
              {
                "layer": "int",
                "position": {
                  "x": "int",
                  "y": "int"
                },
                "size": {
                  "width": "int",
                  "height": "int"
                },
                "font-size": "int",
                "language": "string" // optional, e.g., "javascript", "python"
              }
            ]
          }
        ]
      }
    ]
  }
}
