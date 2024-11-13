userData = 
{
  "store": {
    "name": string,
    "email": string,
    "presentations": [
      {
        "id": int,
        "title": string,
        "description": string,
        "thumbnail": File,
        "default-background": {
          "colour": string, // Hex
          "img": File,
        },
        "slides": [
          {
            "background-style": {
              "colour": string, // Hex
              "img": File,
            },
            "elements": [
              {
                "type": "text",
                "position": {
                  "x": int, // or string for responsive design (e.g., "10%")
                  "y": int,
                },
                "size": {
                  "width": int,
                  "height": int,
                },
                "content": string,
                "font-size": int,
                "colour": string, // Hex
              },
              {
                "type": "image",
                "position": {
                  "x": int,
                  "y": int,
                },
                "size": {
                  "width": int,
                  "height": int,
                },
                "file": File,
                "alt-tag": string,
              },
              {
                "type": "video",
                "position": {
                  "x": int,
                  "y": int,
                },
                "size": {
                  "width": int,
                  "height": int,
                },
                "url": string,
                "autoplay": bool, // optional
              },
              {
                "type": "code",
                "position": {
                  "x": int,
                  "y": int,
                },
                "size": {
                  "width": int,
                  "height": int,
                },
                "font-size": int,
                "language": string, // optional, e.g., "javascript", "python"
              }
            ]
          }
        ]
      }
    ]
  }
}