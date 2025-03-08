FROM python:3.9
WORKDIR /app
COPY . .
EXPOSE 5000
RUN python init_api.py
CMD ["python", "run.py"]