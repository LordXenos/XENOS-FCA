{ pkgs }: {
  deps = [
    pkgs.librsvg
    pkgs.giflib
    pkgs.libjpeg
    pkgs.pango
    pkgs.cairo
    pkgs.pixman
    pkgs.pkg-config
    pkgs.libuuid
    pkgs.bashInteractive
    pkgs.nodePackages.bash-language-server
    pkgs.man
  ];
}