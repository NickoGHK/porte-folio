// Extracts a single video frame as PNG at a given timestamp.
// Usage: xcrun swift video-frame-extract.swift <input.mov/mp4> <timeSeconds> <output.png>
import AVFoundation
import Foundation
import CoreGraphics
import ImageIO
import UniformTypeIdentifiers

let args = CommandLine.arguments
guard args.count >= 4 else {
    print("Usage: video-frame-extract.swift <input> <timeSeconds> <output.png>")
    exit(1)
}
let inputPath = args[1]
let atSeconds = Double(args[2]) ?? 0
let outPath = args[3]

let url = URL(fileURLWithPath: inputPath)
let asset = AVURLAsset(url: url)

let semaphore = DispatchSemaphore(value: 0)
Task {
    do {
        let generator = AVAssetImageGenerator(asset: asset)
        generator.appliesPreferredTrackTransform = true
        generator.requestedTimeToleranceBefore = .zero
        generator.requestedTimeToleranceAfter = .zero

        let time = CMTime(seconds: atSeconds, preferredTimescale: 600)
        let cgImage = try generator.copyCGImage(at: time, actualTime: nil)
        let outURL = URL(fileURLWithPath: outPath)
        if let dest = CGImageDestinationCreateWithURL(outURL as CFURL, UTType.png.identifier as CFString, 1, nil) {
            CGImageDestinationAddImage(dest, cgImage, nil)
            CGImageDestinationFinalize(dest)
            print("Saved \(outPath)")
        }
    } catch {
        print("Error: \(error)")
    }
    semaphore.signal()
}
semaphore.wait()
