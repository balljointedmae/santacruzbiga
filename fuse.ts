import { FuseBox, FuseBoxOptions, Sparky, UglifyESPlugin, SassPlugin, CSSPlugin } from "fuse-box";
import TsTransformClasscat from "ts-transform-classcat";
import TsTransformInferno from "ts-transform-inferno";
let fuseTest: FuseBox;
let fuseClient: FuseBox;
let fuseServer: FuseBox;
const fuseOptions: FuseBoxOptions = {
   homeDir: "ts",
   output: "js/$name.js",
   cache: true,
   sourceMaps: { inline: false, vendor: false },
   transformers: {
      before: [TsTransformClasscat(), TsTransformInferno()]
   },
   plugins: [
   //    UglifyESPlugin({
   //       mangle: {
   //         toplevel: true,
   //         screw_ie8: true,
   //       },
   //     }),
     ],
};
const fuseClientOptions: FuseBoxOptions = {
   ...fuseOptions,
   plugins: [
	  // Setup client-side plugins here
      // CSSPlugin()
      SassPlugin({
         includePaths: [
            "node_modules/bourbon/core"
         ]
        }),
      CSSPlugin()
   ],
};
const fuseServerOptions: FuseBoxOptions = {
   ...fuseOptions
};


// Sparky.task("clean", () => {
//    Sparky.src("js")
//       .clean("js")
//       .exec();
// });
Sparky.task("test", ["&clean", "&config"], () => {
   fuseTest = FuseBox.init(fuseOptions);
   fuseTest.bundle("client/bundle").test("[**/**.test.tsx]", null);
});
Sparky.task("client", () => {
   fuseClient = FuseBox.init(fuseClientOptions);
   fuseClient
      .bundle("client")
      .target("browser@es2015")
      // .watch("client/**")
      // .hmr()
      .instructions("> client/index.tsx");
   fuseClient.run();
});
Sparky.task("server", () => {
   fuseServer = FuseBox.init(fuseServerOptions);
   fuseServer
      .bundle("server")
      .target("server@esnext")
      .instructions("> server/index.tsx");
   fuseServer.run();
});
// Sparky.task("dev", ["clean", "config", "client"], () => {
//    fuse = FuseBox.init(fuseOptions);
//    fuse.run();
// });

