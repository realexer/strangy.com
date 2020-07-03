[Strangy.com] - resurrection of online chatting. 

Open communication with anyone from around the world.

[Strangy.com]: https://strangy.com

##Local emulators
Update firebase-tools: \
```npm install -g firebase-tools```

Make sure that current PowerShell session allows .psl scripts execution: \
```Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope Process```

Run emulators: \
```firebase emulators:start```

Firebase-admin issue: \
When using **firebase-admin** in case of `Channel credentials must be a ChannelCredentials object` run    
```npm i -D google-gax```