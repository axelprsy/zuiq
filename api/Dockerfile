FROM python:3.9
WORKDIR /app
COPY . .
EXPOSE 5000
RUN pip install --no-cache-dir -r requirements.txt
RUN python init_api.py
CMD ["python", "run.py"]