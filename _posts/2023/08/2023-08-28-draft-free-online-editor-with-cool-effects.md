---
title: Free Online Photo Editor with Cool Effects | Edit Images Easily
summary: Transform your images with our free online photo editor with cool effects. Add filters, adjust colors, and apply creative enhancements. Edit your photos easily and make them stand out.
categories: tools
tags: image editor tools effects
date: 2023-08-28 09:09:09 +0000
cover: https://cdn.pixabay.com/photo/2018/07/30/23/20/editor-3573850_1280.jpg
layout: post
---

Enhance your images effortlessly with our free online photo editor. Unleash your creativity by applying cool effects, filters, and color adjustments. Edit your photos with ease and make them stand out from the crowd. Try our powerful photo editing tools today!

    <style>
      body {
        font-family: "Helvetica Neue", sans-serif;
        text-align: center;
        background-color: #f5f5f5;
        margin: 0;
        padding: 0;
      }
      #container {
        margin-top: 50px;
        background-color: white;
        border-radius: 8px;
        padding: 20px;
        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
        display: inline-block;
      }
      img {
        max-width: 100%;
        height: auto;
      }
      #buttonContainer {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        margin-top: 10px;
      }
      select,
      button {
        font-family: "Helvetica Neue", sans-serif;
        padding: 10px;
        border: none;
        border-radius: 6px;
        margin: 5px;
        cursor: pointer;
        background-color: #4caf50;
        color: white;
      }
      button:hover {
        background-color: #45a049;
      }
      a {
        color: #4caf50;
        text-decoration: none;
      }
      #outputContainer {
        margin-top: 20px;
        background-color: white;
        border-radius: 8px;
        padding: 20px;
        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
        position: relative;
        overflow: hidden;
      }
      #outputImage {
        max-width: 100%;
        max-height: 100%;
        transform-origin: center;
        transform: rotate(0deg);
        transition: transform 0.3s ease-in-out;
      }

      #downloadButton:disabled {
        background-color: #aaa;
        color: #fff;
        cursor: not-allowed;
      }
    </style>


    <div id="container">
      <input type="file" id="imageInput" accept="image/*" autocomplete="off" />
      <div id="buttonContainer">
        <select id="effectSelect" autocomplete="off">
          <option value="">No Effect</option>
          <option value="blur(5px)">Blur</option>
          <option value="brightness(150%)">Brightness</option>
          <option value="grayscale(100%)">Grayscale</option>
          <option value="hue-rotate(90deg)">Hue Rotate</option>
          <option value="invert(100%)">Invert</option>
          <option value="opacity(50%)">Opacity</option>
          <option value="saturate(200%)">Saturate</option>
          <option value="sepia(100%)">Sepia</option>
          <option value="rotate(90)">Rotate 90° Right</option>
          <option value="rotate(-90)">Rotate 90° Left</option>
        </select>
        <button id="applyEffectButton">Apply Effect</button>
        <button id="downloadButton" disabled autocomplete="off">
          Download Image
        </button>
      </div>
      <div id="outputContainer">
        <canvas id="previewCanvas" style="display: none"></canvas>
        <div id="output">
          <img id="outputImage" src="" alt="Output Image" />
        </div>
      </div>
    </div>

    <script>
      const imageInput = document.getElementById("imageInput");
      const effectSelect = document.getElementById("effectSelect");
      const applyEffectButton = document.getElementById("applyEffectButton");
      const output = document.getElementById("output");
      const outputImage = document.getElementById("outputImage");
      const downloadButton = document.getElementById("downloadButton");

      let selectedEffect = "";
      let totalRotation = 0;

      imageInput.addEventListener("change", handleImageUpload);
      applyEffectButton.addEventListener("click", applyEffect);
      effectSelect.addEventListener("change", updateSelectedEffect);

      function handleImageUpload(event) {
        const file = event.target.files[0];
        if (file) {
          outputImage.src = URL.createObjectURL(file);
          outputImage.onload = function () {
            output.style.display = "block";
            // downloadButton.style.display = "none";
            applyEffectButton.disabled = false;
            totalRotation = 0; // Reset total rotation when uploading new image
          };
        }
      }

      function updateSelectedEffect() {
        selectedEffect = effectSelect.value;
      }

      function applyEffect() {
        if (!selectedEffect) {
          outputImage.style.filter = "none";
          downloadButton.disabled = true; // Disable the download button
        } else if (selectedEffect.startsWith("rotate")) {
          totalRotation += parseFloat(
            selectedEffect.replace("rotate(", "").replace(")", "")
          ); // Update total rotation
          outputImage.style.transform = `rotate(${totalRotation}deg)`;
          updatePreviewCanvas();
          downloadButton.disabled = false; // Enable the download button
        } else {
          outputImage.style.transform = `rotate(${totalRotation}deg)`;
          outputImage.style.filter = selectedEffect;
          updatePreviewCanvas();
          downloadButton.disabled = false; // Enable the download button
        }
      }
      function updatePreviewCanvas() {
        const previewCanvas = document.getElementById("previewCanvas");
        const context = previewCanvas.getContext("2d");
        const imageWidth = outputImage.naturalWidth;
        const imageHeight = outputImage.naturalHeight;

        if (totalRotation % 180 === 90) {
          previewCanvas.width = imageHeight;
          previewCanvas.height = imageWidth;
        } else {
          previewCanvas.width = imageWidth;
          previewCanvas.height = imageHeight;
        }

        context.filter = outputImage.style.filter;
        context.translate(previewCanvas.width / 2, previewCanvas.height / 2);
        context.rotate(getRotationInRadians());
        context.drawImage(outputImage, -imageWidth / 2, -imageHeight / 2);
      }

      downloadButton.addEventListener("click", downloadImage);

      function downloadImage() {
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        const imageWidth = outputImage.naturalWidth;
        const imageHeight = outputImage.naturalHeight;

        if (totalRotation % 180 === 90) {
          canvas.width = imageHeight;
          canvas.height = imageWidth;
        } else {
          canvas.width = imageWidth;
          canvas.height = imageHeight;
        }

        context.filter = outputImage.style.filter;
        context.translate(canvas.width / 2, canvas.height / 2);
        context.rotate(getRotationInRadians());
        context.drawImage(outputImage, -imageWidth / 2, -imageHeight / 2);

        const link = document.createElement("a");
        link.href = canvas.toDataURL();
        link.download = "output-image.png";
        link.click();

        downloadButton.removeAttribute("disabled");
      }

      function getRotationInRadians() {
        return (totalRotation * Math.PI) / 180;
      }
    </script>
