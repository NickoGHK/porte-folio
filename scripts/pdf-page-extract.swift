// Extracts a single PDF page as a PNG at a controlled max dimension.
// Usage: xcrun swift pdf-page-extract.swift <input.pdf> <pageIndex 0-based> <output.png> <maxDimPixels>
import PDFKit
import Foundation
import AppKit

let args = CommandLine.arguments
guard args.count >= 5 else {
    print("Usage: pdf-page-extract.swift <input.pdf> <pageIndex> <output.png> <maxDimPixels>")
    exit(1)
}
let pdfPath = args[1]
let pageIndex = Int(args[2])!
let outPath = args[3]
let maxDim: CGFloat = CGFloat(Int(args[4]) ?? 1800)

guard let doc = PDFDocument(url: URL(fileURLWithPath: pdfPath)) else {
    print("Failed to open PDF: \(pdfPath)"); exit(1)
}
guard let page = doc.page(at: pageIndex) else {
    print("No page \(pageIndex) in \(pdfPath) (has \(doc.pageCount) pages)"); exit(1)
}
let bounds = page.bounds(for: .mediaBox)
let scale = maxDim / max(bounds.width, bounds.height)
let size = NSSize(width: bounds.width * scale, height: bounds.height * scale)

let image = NSImage(size: size)
image.lockFocus()
NSColor.white.setFill()
NSRect(origin: .zero, size: size).fill()
if let ctx = NSGraphicsContext.current?.cgContext {
    ctx.saveGState()
    ctx.scaleBy(x: scale, y: scale)
    page.draw(with: .mediaBox, to: ctx)
    ctx.restoreGState()
}
image.unlockFocus()

guard let tiff = image.tiffRepresentation, let rep = NSBitmapImageRep(data: tiff),
      let png = rep.representation(using: .png, properties: [:]) else {
    print("Encode failed for \(outPath)"); exit(1)
}
try png.write(to: URL(fileURLWithPath: outPath))
print("Saved \(outPath) (\(Int(size.width))x\(Int(size.height)))")
