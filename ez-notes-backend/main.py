from fastapi import FastAPI
import uvicorn

app = FastAPI(
    # ssl_keyfile="./ssl_certificado/private.key",
    # ssl_certfile="./ssl_certificado/server.crt",
)


@app.get("/")
async def root():
    return {"message": "Hello World"}


if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        reload=True,
        port=2001
        # port=443,
        # ssl_keyfile="./ssl_certificado/private.key",
        # ssl_certfile="./ssl_certificado/server.crt",
    )
