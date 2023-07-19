/* eslint-disable no-unused-vars */
import PropTypes from "prop-types";
import classNames from "classnames";
import Spinner from "../../Spinner";
import Image from "../../Image";
import icons from "../../icons";
import { Label, HelperMessage } from "../../Form";

const namespace = "file-uploader";

const FileUploader = ({
  id,
  name,
  value,
  label,
  modifier,
  loading,
  maxFileSize,
  previewFiles,
  maxNumberOfFiles,
  allowedFileFormats,
  helperMessage,
  onChange,
  className,
}) => {
  const { Upload } = icons;
  const componentClassNames = classNames(namespace, className, {
    [`${namespace}--${modifier}`]: modifier,
  });

  return (
    <div className={componentClassNames}>
      {label && <Label id={id} label={label} />}
      <div className={`${namespace}__dropzone`}>
        <input
          id={id}
          type="file"
          name={name}
          value={value}
          accept=".png,.jpg,.pdf"
          onChange={onChange}
          className={`${namespace}__dropzone-input`}
          multiple
        />
        <div className={`${namespace}__dropzone-button`}>
          <div className={`${namespace}__dropzone-container`}>
            {loading ? (
              <Spinner borderColor="#2968c8" borderWidth="2px" />
            ) : (
              <>
                <p className={`${namespace}__dropzone-text`}>
                  <span className={`${namespace}__dropzone-icon`}>
                    <Upload />
                  </span>
                  <span className={`${namespace}__dropzone-call-to-action`}>
                    Seleccionar{" "}
                  </span>
                  <span className={`${namespace}__dropzone-description`}>
                    o arrastrar el archivo aquí
                  </span>
                </p>
                <p className={`${namespace}__dropzone-requirements`}>
                  {`Hasta ${maxNumberOfFiles} archivos ${allowedFileFormats.join(
                    ", "
                  )} con peso máximo ${maxFileSize} cada uno`}
                </p>
              </>
            )}
          </div>
        </div>
      </div>
      {previewFiles && (
        <div className={`${namespace}__preview-files`}>
          {Array.isArray(previewFiles) ? (
            <>
              {previewFiles.map((file, index) => (
                <Image
                  key={index}
                  maxHeight="120px"
                  alignment="left"
                  paddingSize="0"
                  borderRadius="4"
                  source={file}
                  showBorder
                />
              ))}
            </>
          ) : (
            <Image
              maxWidth="120px"
              alignment="left"
              paddingSize="0"
              borderRadius="4"
              source={previewFiles}
              showBorder
            />
          )}
        </div>
      )}
      {helperMessage && (
        <HelperMessage modifier={modifier} message={helperMessage} />
      )}
    </div>
  );
};

FileUploader.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  modifier: PropTypes.string,
  loading: PropTypes.bool,
  previewFiles: PropTypes.arrayOf(PropTypes.string),
  maxFileSize: PropTypes.string,
  maxNumberOfFiles: PropTypes.number,
  allowedFileFormats: PropTypes.arrayOf(PropTypes.string),
  label: PropTypes.string,
  helperMessage: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string,
};

FileUploader.defaultProps = {
  modifier: "",
  helperMessage: "",
  maxFileSize: "100KB",
  previewFiles: [],
  maxNumberOfFiles: 10,
  allowedFileFormats: ["jpg", "png", "pdf"],
  loading: false,
  className: "",
};

export default FileUploader;
