function jjsExec(args) {
	print("KillHttpServer called: " + args );
	pwa.httpServer.stop();
}
